import Ember from 'ember';
import {isNotFoundError} from 'ember-ajax/errors';


const urlJoin = requireNode('url-join');

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
  }
});
