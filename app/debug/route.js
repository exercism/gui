import Ember from 'ember';

export default Ember.Route.extend({
  debug: Ember.inject.service(),

  model() {
    let debug = this.get('debug'),
        servicesStatus = debug.getServicesStatus();

    return debug.getLatestRelease().then((release) => {
      return {
        arch: debug.arch,
        platform: debug.platform,
        currentTag: debug.currentTag,
        latestTag: release.tagName,
        homeDir: debug.homeDir,
        homeExercisesDir: debug.homeExercisesDir,
        configFilePath: debug.configFilePath,
        servicesStatus,
      };
    });
  }
});
