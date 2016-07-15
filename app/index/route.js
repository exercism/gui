import Ember from 'ember';

export default Ember.Route.extend({
  debug: Ember.inject.service(),

  model() {
    let debug = this.get('debug');
    return debug.getLatestRelease().then((release) => {
      return {
        info: {
          arch: debug.arch,
          tag: debug.currentTag,
          platform: debug.platform,
        },
        release
      };
    });
  }

});
