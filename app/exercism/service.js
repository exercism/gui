import Ember from 'ember';

const urlJoin = requireNode('url-join');

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  configuration: Ember.inject.service(),

  getStatus(track) {
    let apiKey = this.get('configuration.apiKey'),
        api = this.get('configuration.api'),
        url = urlJoin(api, `/api/v1/tracks/${track}/status`, `?key=${apiKey}`);
    return this.get('ajax').request(url);

  }
});
