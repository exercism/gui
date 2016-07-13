/* jshint node: true */
module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'exercism-gui',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      releaseTag: (process.env.TRAVIS_TAG) ? process.env.TRAVIS_TAG : '0.0.0-dev'
    },
    flashMessageDefaults: {
      timeout: 3000,
      types: ['positive', 'negative', 'info']
    },
  };

  ENV['ember-cli-mirage'] = {
    enabled: (process.env.DISABLE_EMBER_CLI_MIRAGE === 'true')? false : true
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['ember-cli-mirage'].enabled = true;
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'].enabled = false;
  }

  return ENV;
};
