import { test } from 'qunit';
import moduleForAcceptance from 'exercism-gui/tests/helpers/module-for-acceptance';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForAcceptance('Acceptance | download');

test('download shows success status', function(assert) {
  visit('/download');

  fillIn(testSelector('input'), 'good');
  click(testSelector('btn'));

  andThen(function() {
    assert.equal(currentURL(), '/download/good/status');
    assert.ok(find(testSelector('success')).text().toLowerCase().includes('success'));
    assert.equal(find(testSelector('error')).text(), '');
  });
});

test('unsuccesfull download shows error message', function(assert) {
  visit('/download/bad/status');

  andThen(function() {
    assert.equal(currentURL(), '/download/bad/status');
    assert.ok(find(testSelector('error')).text().includes('wrong'));
    assert.equal(find(testSelector('success')).text(), '');
  });
});
