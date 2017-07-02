import Ember from 'ember';
import ENV from 'exercism-gui/config/environment';

const os = requireNode('os'),
      url = requireNode("url"),
      ping = requireNode("ping"),
      osHomedir = requireNode('os-homedir');

const { releaseTag } = ENV.APP;

const OK = 'OK',
      NOT_OK = 'NOT_OK';

const ServiceStatus = Ember.Object.extend({
  name: null,
  host: null,
  status: 'VERIFYING'
});

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  configuration: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.set('currentTag', releaseTag);
    this.set('arch', os.arch());
    this.set('platform', os.platform());
    this.set('homeDir', osHomedir());
    this.set('configFilePath', this.get('configuration').getHomeConfigFilePath());
  },

  homeExercisesDir: Ember.computed('configuration.dir', function() {
    return this.get('configuration.dir');
  }),

  getLatestRelease() {
    let url = 'https://api.github.com/repos/exercism/gui/releases/latest';

    return this.get('ajax').request(url).then((release) => {
      let assets = release.assets.map((asset) => {
        return {
          browserDownloadUrl: asset.browser_download_url,
          name: asset.name,
          size: asset.size
        };
      });

      return {
        htmlUrl: release.html_url,
        publishedAt: release.published_at,
        tagName: release.tag_name,
        assets
      };

    }).catch((error) => {
      Ember.Logger.warn('Cannot verify new release. Skipped due to error', error);
      return null;
    });
  },

  getServicesStatus() {
    let configuration = this.get('configuration'),
        servicesStatus = [];

    // x.exercism.io is not responding to ping at port 80 so we just
    // do a simple GET request
    let serviceStatus = ServiceStatus.create({
      name: 'XAPI',
      host: url.parse(configuration.xapi, true).host
    });

    servicesStatus.push(serviceStatus);

    this.get('ajax').request(configuration.xapi).then((response) => {
      if (response.build_id || response.repository) {
        serviceStatus.set('status', OK);
      } else {
        serviceStatus.set('status', NOT_OK);
      }
    }).catch(() => {
      serviceStatus.set('status', NOT_OK);
    });

    let targets = [
      { host: url.parse(configuration.api, true).host, name: 'API' },
      { host: 'api.github.com', name: 'Github API' }
    ];

    targets.forEach((target) => {
      let serviceStatus = ServiceStatus.create({ name: target.name, host: target.host });
      servicesStatus.push(serviceStatus);

      ping.sys.probe(target.host, (isAlive) => {

        serviceStatus.set('status', isAlive ? OK : NOT_OK);

      }, { timeout: 2000 });

    });

    return servicesStatus;
  }

});
