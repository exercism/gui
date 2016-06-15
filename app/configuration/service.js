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

  getHomeConfigFilePath() {
    return path.join(osHomedir(), '.exercism.json');
  },

  getHomeExercisesDir() {
    return path.join(osHomedir(), 'exercism');

  },

  getDefaults() {
      return {
        api: 'http://exercism.io',
        xapi: 'http://x.exercism.io',
        apiKey: null,
        dir: this.getHomeExercisesDir(),
    };
  },

  update(config) {
    let defaults = this.getDefaults();
    this.set('api', config.api ? config.api : defaults.api);
    this.set('xapi', config.xapi ? config.xapi : defaults.xapi);
    this.set('dir', config.dir ? config.dir : defaults.dir);
    this.set('apiKey', config.apiKey ? config.apiKey : defaults.key);
  },

  fileExists(filePath) {
    try {
      let stat = fs.statSync(filePath);
      return stat.isFile();
    } catch(err) {
      window.console.log('file does not exists:', filePath);
      return false;
    }
  },

  getConfigFilePath() {
    let configFilePath = process.env.EXERCISM_CONFIG_FILE;
    if (configFilePath) {
      window.console.log(`Using config file ${configFilePath} set by envar EXERCISM_CONFIG_FILE`);
    } else {
      configFilePath = this.getHomeConfigFilePath();
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
      return this.getDefaults();
    }
    window.console.log('hhh', configFilePath);
    return jsonfile.readFileSync(configFilePath);
  }

});
