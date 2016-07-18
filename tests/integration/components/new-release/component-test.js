import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('new-release', 'Integration | Component | new release', {
  integration: true
});


let getAssets = function(tagName, platforms=null) {
  platforms = platforms? platforms : ['linux-x64', 'darwin-x64', 'win32-x64', 'win32-x86'];
  return platforms.map((platform) => {
    let name = `exercism-gui-${platform}-${tagName}.tar.gz`;

    return {
      browserDownloadUrl: `https://gh.com/download/${tagName}/${name}`,
      size: 43604687,
      name
    };
  });
};


let getRelease = function(tagName='v0.0.5') {
  return {
    htmlUrl: `https://github.com/exercism/gui/releases/tag/${tagName}`,
    publishedAt: '2016-07-11T19:00:00Z',
    tagName,
    assets: getAssets(tagName),
  };
};

test('it shows new release details', function(assert) {
  let release = getRelease('v0.1.0');
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'linux', arch: 'x64' });
  this.render(hbs`{{new-release release=release info=info}}`);
  assert.ok(this.$(testSelector('published-at')).text().includes('ago'));
  assert.equal(this.$(testSelector('tag-name')).text().trim(), '0.1.0');
  assert.equal(this.$(testSelector('tag-name')).attr('href'), release.htmlUrl);
});

test('it shows nothing if release is null', function(assert) {
  this.set('release', null);

  this.render(hbs`{{new-release release=release info=info}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it shows nothing if release is the same', function(assert) {
  this.set('release', getRelease('v0.0.1'));
  this.set('info', { tag: 'v0.0.1' });

  this.render(hbs`{{new-release release=release info=info}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it shows nothing if release is older', function(assert) {
  this.set('release', getRelease('v0.0.1'));
  this.set('info', { tag: 'v0.0.2' });

  this.render(hbs`{{new-release release=release info=info}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it provides a download link for the proper platform - linux', function(assert) {
  let release = getRelease();
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'linux', arch: 'x64' });
  this.render(hbs`{{new-release release=release info=info}}`);
  let pkg = release.assets[0];
  assert.equal(this.$(testSelector('pkg-download-link')).text().trim(), pkg.browserDownloadUrl);
  assert.equal(this.$(testSelector('pkg-download-link')).attr('href'), pkg.browserDownloadUrl);
  assert.equal(this.$(testSelector('pkg-size')).text().trim(), `${(pkg.size / 1000000).toFixed(2)} MiB`);
});

test('it provides a download link for the proper platform - darwin', function(assert) {
  let release = getRelease();
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'darwin', arch: 'x64' });
  this.render(hbs`{{new-release release=release info=info}}`);
  let pkg = release.assets[1];
  assert.equal(this.$(testSelector('pkg-download-link')).text().trim(), pkg.browserDownloadUrl);
});

test('it provides a download link for the proper platform - win32 x64', function(assert) {
  let release = getRelease();
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'win32', arch: 'x64' });
  this.render(hbs`{{new-release release=release info=info}}`);
  let pkg = release.assets[2];
  assert.equal(this.$(testSelector('pkg-download-link')).text().trim(), pkg.browserDownloadUrl);
});

test('it provides a download link for the proper platform - win32 x86', function(assert) {
  let release = getRelease();
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'win32', arch: 'x86' });
  this.render(hbs`{{new-release release=release info=info}}`);
  let pkg = release.assets[3];
  assert.equal(this.$(testSelector('pkg-download-link')).text().trim(), pkg.browserDownloadUrl);
});

test('it provides a download link for the proper platform - win32 ia32', function(assert) {
  let release = getRelease();
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'win32', arch: 'ia32' });
  this.render(hbs`{{new-release release=release info=info}}`);
  let pkg = release.assets[3];
  assert.equal(this.$(testSelector('pkg-download-link')).text().trim(), pkg.browserDownloadUrl);
});

test('it hides message if showMessage is false', function(assert) {
  let tag = 'v0.0.1',
      release = getRelease('v0.0.1');
  this.setProperties({ release, info: { tag } });
  this.render(hbs`{{new-release release=release info=info showMessage=false}}`);
  assert.equal(this.$(testSelector('message')).text(), '');
});

test('it shows a message if up-to-date', function(assert) {
  let tag = 'v0.0.1',
      release = getRelease('v0.0.1');
  this.setProperties({ release, info: { tag } });
  this.render(hbs`{{new-release release=release info=info showMessage=true}}`);
  assert.ok(this.$(testSelector('message')).text().includes('up to date'));
});

test('it shows a message if no release info available', function(assert) {
  this.render(hbs`{{new-release release=null info=null showMessage=true}}`);
  assert.ok(this.$(testSelector('message')).text().toLowerCase().includes('could not connect'));
});

test('it hides package link if no assets', function(assert) {
  let release = getRelease('v0.1.0');
  release.assets = [];
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1' });
  this.render(hbs`{{new-release release=release info=info}}`);
  assert.equal(this.$(testSelector('download-link')).text(), '');
});

test('it hides package link if no asset for the platform', function(assert) {
  let release = getRelease('v0.1.0');
  release.assets = getAssets('v0.1.0', ['linux-x64']);
  this.set('release', release);
  this.set('info', { tag: 'v0.0.1', platform: 'win32', arch: 'ia32' });
  this.render(hbs`{{new-release release=release info=info}}`);
  assert.equal(this.$(testSelector('download-link')).text(), '');
});
