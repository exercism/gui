import Ember from 'ember';

export default Ember.Route.extend({
  debug: Ember.inject.service(),

  model() {
    let debug = this.get('debug');
    let response = Ember.Object.create({
      info: {
        arch: debug.arch,
        tag: debug.currentTag,
        platform: debug.platform,
      },
      relese: null
    });

    debug.getLatestRelease().then((release) => {
      response.set('release', release);
    });
    return response;
  }

});
