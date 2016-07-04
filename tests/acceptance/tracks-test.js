import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'exercism-gui/tests/helpers/module-for-acceptance';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';
import td from 'testdouble';

moduleForAcceptance('Acceptance | tracks');

/*
TODO: check why this happens in ci
{"module":"Acceptance | tracks","name":"selecting a track at /tracks redirects to track details","result":false,"message":"TypeError: Cannot read property 'dispatchEvent' of undefined","actual":false,"expected":true,"testId":"d7de7bd2","negative":false,"runtime":2056,"source":"    at file:///Users/travis/build/holandes22/exercism-gui/tmp/class-tests_dist_electron-XbCY4684.tmp/assets/test-support.js:4147:12"}
*/
test('selecting a track at /tracks redirects to track details', function(assert) {
  let lang = 'elixir';
  server.create('track', { id: lang });

  visit('/tracks');
  selectChoose('.track-selector', lang);

  andThen(function() {
    assert.equal(currentURL(), `/tracks/${lang}`);
  });
});

test('it shows error page if api responds with error when listing tracks', function(assert) {
  server.get('http://x.exercism.io/tracks', { errors: ['There was an error'] }, 500);

  // we need to stub this to avoid ember catching the error
  // taken from this question at stackoverflow
  // http://stackoverflow.com/questions/34074386/how-to-test-ember-error-substate-with-ember-cli-test-runner
  const emberTestAdapterException = Ember.Test.adapter.exception;
  Ember.Test.adapter.exception = td.function();

  visit('/tracks');

  andThen(function() {
    assert.equal(currentURL(), '/tracks');
    assert.equal(find(testSelector('errors')).text().trim(), 'There was an error');

    // Restore the adapter
    Ember.Test.adapter.exception = emberTestAdapterException;
  });
});

test('it shows submission link at submission route', function(assert) {
  let slug = 'bob',
      trackId = 'elixir',
      url = 'http://exercism.io/submissions/fake';

  server.create('track', { id: trackId });
  server.get(
    `http://exercism.io/api/v1/submissions/${trackId}/${slug}`,
    { slug, url, track_id: trackId });
  visit(`/tracks/${trackId}/status/submission/${slug}`);

  andThen(function() {
    let expected = `Link to latest submission for "${slug}"`;
    assert.equal(find(testSelector('submission-header')).text().trim(), expected);
    assert.equal(find(testSelector('submission-link')).text().trim(), url);
  });
});

test('it shows no submission message if 404', function(assert) {
  let slug = 'bob',
      trackId = 'elixir',
      error = `No solutions found for "${slug}"`;

  server.create('track', { id: trackId });
  server.get(`http://exercism.io/api/v1/submissions/${trackId}/${slug}`, { error }, 404);
  visit(`/tracks/${trackId}/status/submission/${slug}`);

  andThen(function() {
    assert.equal(find(testSelector('submission-header')).text().trim(), error);
  });
});

test('it redirect to status when clicking on status button', function(assert) {
  let lang = 'elixir';
  server.create('track', { id: lang });

  visit(`/tracks/${lang}`);
  andThen(function() {
    click(find(testSelector('status-btn')));
    andThen(function() {
      assert.equal(currentURL(), `/tracks/${lang}/status`);
    });
  });

});
