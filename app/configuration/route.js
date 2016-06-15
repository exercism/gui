import Ember from 'ember';

export default Ember.Route.extend({
  notifier: Ember.inject.service(),
  configuration: Ember.inject.service(),

  model() {
    let configService = this.get('configuration'),
        config = configService.readConfigFile();
    config.configFilePath = configService.getConfigFilePath();
    return config;
  },

  actions: {
    saveConfig(config) {
        this.get('configuration').writeConfigFile(config);
        let message = `Configuration saved to ${this.get('currentModel.configFilePath')}`;
        this.get('notifier').notify(message);
    }
  }

});
