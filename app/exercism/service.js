import Ember from 'ember';
import {isNotFoundError, isBadRequestError } from 'ember-ajax/errors';

const urlJoin = requireNode('url-join'),
      fs = requireNode('fs'),
      mkdirp = requireNode('mkdirp'),
      path = requireNode('path'),
      lodash = requireNode('lodash');

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  configuration: Ember.inject.service(),

  getStatus(track) {
    let apiKey = this.get('configuration.apiKey'),
        api = this.get('configuration.api'),
        url = urlJoin(api, `/api/v1/tracks/${track}/status?key=${apiKey}`);
    return this.get('ajax').request(url);
  },

  getLatestSubmission(track, slug) {
    let apiKey = this.get('configuration.apiKey'),
        api = this.get('configuration.api'),
        url = urlJoin(api, `/api/v1/submissions/${track}/${slug}?key=${apiKey}`);
    return this.get('ajax').request(url).catch((error) => {
      if(isNotFoundError(error)) {
        return { url: null, track_id: track, slug };
      }
      throw error;
    });
  },

  skip(track, slug) {
    let apiKey = this.get('configuration.apiKey'),
        api = this.get('configuration.api'),
        url = urlJoin(api, `/api/v1/iterations/${track}/${slug}/skip?key=${apiKey}`);
    return this.get('ajax').post(url).then(() => {
      return { success: `Skipped ${slug} in track ${track}` };
    }).catch((error) => {
      if(isNotFoundError(error)) {
        return { error: error.errors[0].detail.error };
      }
      throw error;
    });
  },

  fetch(track, problem=null) {
    let apiKey = this.get('configuration.apiKey'),
        api = this.get('configuration.xapi'),
        url = urlJoin(api, `/v2/exercises/${track}`);
    if (problem) {
      url = urlJoin(url, `${problem}?key=${apiKey}`);
    } else {
      url = url + `?key=${apiKey}`;
    }
    return this.get('ajax').request(url);
  },

  fetchSeveral(track, problems) {
    let promises = [];
    lodash.forEach(problems, (problem) => {
      promises.push(this.fetch(track, problem));
    });
    return Ember.RSVP.all(promises);
  },

  saveProblems(problems, dir) {
    let problemsSaved = [];
    lodash.forEach(problems, (problem) => {
      let slug = problem.slug,
          language = problem.language,
          dirPath = path.join(dir, language, slug),
          dirExists = fs.existsSync(dirPath),
          summary = { problem: slug, new: [], unchanged: [] };
      if (!dirExists) {
        mkdirp.sync(dirPath);
      }

      lodash.forEach(problem.files, (content, fileName) => {
        let filePath = path.join(dirPath, fileName);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content);
          summary.new.push(fileName);
        } else {
          summary.unchanged.push(fileName);
        }
      });
      problemsSaved.push(summary);
    });
    return problemsSaved;
  },

  fetchAndSaveProblems(track) {
    return this.fetch(track).then((problems) => {
      return this.saveProblems(problems.problems, this.get('configuration.dir'));
    });
  },

  fetchSeveralAndSaveProblems(track, problems) {
    return this.fetchSeveral(track, problems).then((response) => {
      let fetchedProblems = [];
      lodash.forEach(response, (problem) => {
        fetchedProblems.push(problem.problems[0]);
      });
      return this.saveProblems(fetchedProblems, this.get('configuration.dir'));
    });
  },

  _getValidLocalDirs(root, validSlugs) {
    let dirs = [];
    if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
      return dirs;
    }
    lodash.forEach(fs.readdirSync(root), (file) => {
      let fpath = path.join(root, file);
      if (fs.statSync(fpath).isDirectory() && validSlugs.contains(file)) {
        dirs.push(fpath);
      }
    });
    return dirs;
  },

  _getProblemFiles(dir) {
    return fs.readdirSync(dir).filter((file) => {
      let fpath = path.join(dir, file);
      return fs.statSync(fpath).isFile() && file !== 'README.md' && !file.includes('test');
    });
  },

  getLocalProblems(trackId, validSlugs) {
    let exercismDir = this.get('configuration.dir'),
        trackDir = path.join(exercismDir, trackId),
        problems = [],
        dirs = this._getValidLocalDirs(trackDir, validSlugs);
    lodash.forEach(dirs, (dir) => {
      let files = this._getProblemFiles(dir),
          name = path.basename(dir);
      problems.push({ name, files, dir });
    });
    return problems;
  },

  submit(filePath) {
    let key = this.get('configuration.apiKey'),
        api = this.get('configuration.api'),
        dir = this.get('configuration.dir'),
        fileName = path.basename(filePath),
        problem = path.basename(path.dirname(filePath)),
        language = path.basename(path.dirname(path.dirname(filePath))),
        solutionString = fs.readFileSync(filePath, { encoding: 'utf-8' }),
        url = urlJoin(api, '/api/v1/user/assignments'),
        solution = {};
    solution[fileName] = solutionString;
    let payload = { key, dir, language, problem, solution, code: '' };
    let options = {
      data: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    };
    return this.get('ajax').post(url, options).catch((error) => {
      if(isBadRequestError(error)) {
        return { error: error.errors[0].detail.error };
      }
      throw error;
    });
  }
});
