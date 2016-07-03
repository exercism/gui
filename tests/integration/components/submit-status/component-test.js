import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('submit-status', 'Integration | Component | submit status', {
  integration: true
});

test('it shows a success message if submission succeeded', function(assert) {
  let status = { success: { submittedFile: 'somefile', iteration: 3 } };
  this.set('status', status);
  this.render(hbs`{{submit-status status=status}}`);
  assert.equal(this.$(testSelector('success-msg')).text().trim(), 'File somefile submitted succesfully');
  assert.equal(this.$(testSelector('iteration')).text().trim(), 'Iteration number 3');
});

test('it shows an error message if submission duplicate', function(assert) {
  let status = { error: 'some error message' };
  this.set('status', status);
  this.render(hbs`{{submit-status status=status}}`);
  assert.equal(this.$(testSelector('error-msg')).text().trim(), 'some error message');
});
