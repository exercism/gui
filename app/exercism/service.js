import Ember from 'ember';
import {isNotFoundError} from 'ember-ajax/errors';

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
      if(isNotFoundError) {
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
      if(isNotFoundError) {
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
  }

});
