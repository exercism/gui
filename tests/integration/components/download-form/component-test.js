import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('download-form', 'Integration | Component | download form', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{download-form}}`);

  let input = this.$(testSelector('input'));
  assert.equal(input.attr('placeholder'), 'ID of submitted solution to dowload');
  assert.equal(input.val(), '');

  input.val('someuuid');
  input.trigger('input');

  assert.equal(input.val(), 'someuuid');
});

test('it shows validation error and disabled button if empty input', function(assert) {
  this.render(hbs`{{download-form}}`);

  this.$(testSelector('input')).val('').trigger('input');
  this.$(testSelector('btn')).click();

  assert.ok(this.$(testSelector('btn')).hasClass('disabled'));
  assert.equal(this.$(testSelector('errmsg')).text().trim(), 'This field can\'t be blank');
});

test('it sends uuid when clicking download button', function(assert) {
  this.set('download', (uuid) => {
    assert.equal(this.$(testSelector('errmsg')).text(), '');

    assert.equal(uuid, 'fakeuuid');
  });

  this.render(hbs`{{download-form download=(action download)}}`);

  this.$(testSelector('input')).val('fakeuuid').trigger('input');
  this.$(testSelector('btn')).click();
});
