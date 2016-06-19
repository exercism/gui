import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'exercism-gui/tests/helpers/module-for-acceptance';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';
import td from 'testdouble';

moduleForAcceptance('Acceptance | tracks');

/*
TODO: check why this happens
{"module":"Acceptance | tracks","name":"selecting a track at /tracks redirects to track details","result":false,"message":"TypeError: Cannot read property 'dispatchEvent' of undefined","actual":false,"expected":true,"testId":"d7de7bd2","negative":false,"runtime":2056,"source":"    at file:///Users/travis/build/holandes22/exercism-gui/tmp/class-tests_dist_electron-XbCY4684.tmp/assets/test-support.js:4147:12"}
test('selecting a track at /tracks redirects to track details', function(assert) {
  let lang = 'elixir';
  server.create('track', { id: lang });

  visit('/tracks');
  selectChoose('.track-selector', lang);

  andThen(function() {
    assert.equal(currentURL(), `/tracks/${lang}`);
  });
});
*/

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

test('it shows error page if api responds with error when getting track details', function(assert) {
  server.get('http://x.exercism.io/tracks/elixir', { errors: ['There was an error'] }, 500);

  const emberTestAdapterException = Ember.Test.adapter.exception;
  Ember.Test.adapter.exception = td.function();

  visit('/tracks/elixir');

  andThen(function() {
    assert.equal(currentURL(), '/tracks/elixir');
    assert.equal(find(testSelector('errors')).text().trim(), 'There was an error');

    Ember.Test.adapter.exception = emberTestAdapterException;
  });
});
