import Ember from 'ember';
import ENV from 'exercism-gui/config/environment';

const os = requireNode('os');
const { releaseTag } = ENV.APP;

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
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
        info: {
          arch: os.arch(),
          tag: releaseTag,
          platform: os.platform(),
        },
        release: {
          htmlUrl: release.html_url,
          publishedAt: release.published_at,
          tagName: release.tag_name,
          assets
        }
      };
    }).catch((error) => {
      Ember.Logger.warn('Cannot verify new release. Skipped due to error', error);
      return null;
    });
  }

});
