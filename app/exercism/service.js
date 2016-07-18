import Ember from 'ember';

const { get } = Ember;

const fs = requireNode('fs'),
      mkdirp = requireNode('mkdirp'),
      path = requireNode('path'),
      lodash = requireNode('lodash');

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  configuration: Ember.inject.service(),

  saveProblems(problems) {
    let problemsSaved = [],
        dir = this.get('configuration.dir');

    problems.forEach((problem) => {
      let slug = get(problem, 'slug'),
          language = get(problem, 'language'),
          dirPath = path.join(dir, language, slug),
          summary = { problem: slug, new: [], unchanged: [] };

      lodash.forEach(get(problem, 'files'), (content, fileName) => {
        let filePath = path.join(dirPath, fileName);

        // Make sure the dirs exists
        mkdirp.sync(path.dirname(filePath));

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

      return file !== 'README.md' &&
             fs.statSync(fpath).isFile() &&
             !file.toLowerCase().includes('test');
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

  _extractInfoFromFilePath(filePath, dir, sep=path.sep) {
    let bits = filePath.replace(dir, '').split(sep),
        problem = bits[2],
        language = bits[1],
        fileName = bits.slice(-1)[0];

    return { fileName, problem, language };
  },

  getSubmitPayload(filePath) {
    let solution = {}, code = '',
        key = this.get('configuration.apiKey'),
        dir = this.get('configuration.dir');

    let { fileName, problem, language } = this._extractInfoFromFilePath(filePath, dir);

    solution[fileName] = fs.readFileSync(filePath, { encoding: 'utf-8' });

    return { key, dir, language, problem, solution, code };
  },

  saveSubmittedFiles(submission) {
    let dir = this.get('configuration.dir'),
        username = get(submission, 'username'),
        trackId = get(submission, 'trackId'),
        slug = get(submission, 'slug'),
        uuid = get(submission, 'uuid'),
        folderPath = path.join(dir, 'solutions', username, trackId, slug, uuid);

      mkdirp.sync(folderPath);

      lodash.forEach(get(submission, 'solutionFiles'), (content, name) => {
        fs.writeFileSync(path.join(folderPath, name), content);
      });

      return folderPath;
  }

});
