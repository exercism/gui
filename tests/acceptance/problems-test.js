import { test } from 'qunit';
import moduleForAcceptance from 'exercism-gui/tests/helpers/module-for-acceptance';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForAcceptance('Acceptance | problems');

test('it skips a problem', function(assert) {
  visit('/tracks/elixir/problems/bob/skip');

  andThen(function() {
    assert.equal(currentURL(), '/tracks/elixir/problems/bob/skip');
    let expected = 'Skipped bob in track elixir';
    assert.equal(find(testSelector('skip-success')).text().trim(), expected);
  });
});
