import Ember from 'ember';

const semver = requireNode('semver'),
      lodash = requireNode('lodash');

export default Ember.Component.extend({
  newerVersionAvailable: Ember.computed('release.tagName', 'info.tag', function() {
    if (!this.get('release')) {
      return false;
    }
    return semver.gt(this.get('release.tagName'), this.get('info.tag'));
  }),

  asset: Ember.computed('release.assets.[]', function() {
    let assets = this.get('release.assets'),
        arch = this.get('info.arch'),
        platform = this.get('info.platform');

    if (arch === 'ia32') {
      arch = 'x86';
    }

    return lodash.find(assets, (asset) => {
      // eslint-disable-next-line no-unused-vars
      let [_n0, _n1, pkgPlatform, pkgArch, ...rest] = asset.name.split('-'); // jshint ignore:line

      if (platform === pkgPlatform && pkgArch === arch) {
        return asset;
      }
    });
  }),

  cleanTag: Ember.computed('release.tagName', function() {
    return semver.clean(this.get('release.tagName'));
  }),

  assetSize: Ember.computed('asset', function() {
    return (this.get('asset.size') / 1000000).toFixed(2);
  })
});
