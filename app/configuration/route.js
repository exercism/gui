import Ember from 'ember';

export default Ember.Route.extend({
  configuration: Ember.inject.service(),

  model() {
    let configService = this.get('configuration'),
        config = configService.readConfigFile();
    config.configFilePath = configService.getConfigFilePath();
    return config;
  }

});
