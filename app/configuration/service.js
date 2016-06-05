import Ember from 'ember';

let fs = requireNode('fs'),
    jsonfile = requireNode('jsonfile'),
    path = requireNode('path'),
    osHomedir = requireNode('os-homedir');

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    let config = this.readConfigFile();
    this.update(config);
  },

  update(config) {
    this.set('api', config.api ? config.api : 'http://exercism.io');
    this.set('xapi', config.xapi ? config.xapi : 'http://x.exercism.io');
  },

  fileExists(filePath) {
    try {
      let stat = fs.statSync(filePath);
      return stat.isFile();
    } catch(err) {
      return false;
    }
  },

  getConfigFilePath() {
    let configFilePath = process.env.EXERCISM_CONFIG_FILE;
    if (configFilePath) {
      window.console.log(`Using config file ${configFilePath} set by envar EXERCISM_CONFIG_FILE`);
    } else {
      configFilePath = path.join(osHomedir(), '.exercism.json');
    }
    return configFilePath;
  },

  writeConfigFile(config) {
    let configFilePath = this.getConfigFilePath();
    jsonfile.writeFileSync(configFilePath, config);
    this.update(config);
  },

  readConfigFile() {
    let configFilePath = this.getConfigFilePath();
    if (!this.fileExists(configFilePath)) {
      return { api: null, xapi: null, apiKey: null, dir: null };
    }
    return jsonfile.readFileSync(configFilePath);
  }

});
