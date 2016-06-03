import Ember from 'ember';

let rp = requireNode('request-promise');

export default Ember.Service.extend({
  configuration: Ember.inject.service(),

  getTracks() {
    let xapi = this.get('configuration.xapi'),
        uri = `${xapi}/tracks`,
        options = { uri, json: true };
    return rp(options);
  }
});
