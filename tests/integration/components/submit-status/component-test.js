import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('submit-status', 'Integration | Component | submit status', {
  integration: true
});

test('it shows a success message if submission succeeded', function(assert) {
  let status = {
    error: null,
    submittedFile: 'somefile',
    iteration: 3,
    url: 'http://exercism.io/someuuid',
  };
  this.set('status', status);
  this.render(hbs`{{submit-status status=status}}`);
  assert.equal(this.$(testSelector('success-msg')).text().trim(), 'file submitted succesfully');
  assert.equal(this.$(testSelector('iteration')).text().trim(), 'Iteration number: 3');
  assert.equal(this.$(testSelector('submitted-file')).text(), 'File: somefile');
  assert.equal(this.$(testSelector('url')).text().trim(), `Link to submission: ${status.url}`);
});

test('it shows an error message if submission duplicate', function(assert) {
  let status = {
    error: 'some error message',
    submittedFile: 'somefile',
    iteration: null,
  };
  this.set('status', status);
  this.render(hbs`{{submit-status status=status}}`);
  assert.equal(this.$(testSelector('error-msg')).text().trim(), 'some error message');
  assert.equal(this.$(testSelector('iteration')).text(), '');
  assert.equal(this.$(testSelector('submitted-file')).text().trim(), 'Submitted file was somefile');
});
