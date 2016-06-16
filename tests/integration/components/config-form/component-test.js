import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';


moduleForComponent('config-form', 'Integration | Component | config form', {
  integration: true
});

test('it hides validation errors on first render', function(assert) {
  this.set('config', {});
  this.render(hbs`{{config-form config=config}}`);
  assert.equal(this.$(testSelector('dir-errmsg')).text(), '');
  assert.notOk(this.$(testSelector('dir-field')).hasClass('error'));
});

test('it validates input', function(assert) {
  this.set('config', {});
  this.render(hbs`{{config-form config=config}}`);
  assert.equal(this.$(testSelector('dir-errmsg')).text(), '');
  this.$(testSelector('save-btn')).click();
  assert.equal(this.$(testSelector('dir-errmsg')).text().trim(), 'This field can\'t be blank');
  assert.ok(this.$(testSelector('dir-field')).hasClass('error'));
});

test('it sends action up on save will all the correct values', function(assert) {
  let config = {
    api: 'http://a.com',
    xapi: 'http://x.a.com',
    apiKey: 'aabbcc',
    dir: '/a/fake/path'
  };
  let newPath = '/some/new/path';
  let save = function(configToSave) {
    assert.equal(this.$(testSelector('dir-errmsg')).text(), '');
    assert.notOk(this.$(testSelector('dir-field')).hasClass('error'));

    assert.equal(configToSave.api, config.api);
    assert.equal(configToSave.xapi, config.xapi);
    assert.equal(configToSave.apiKey, config.apiKey);
    assert.equal(configToSave.dir, newPath);
  };
  this.set('config', config);
  this.set('actions', { save });
  this.render(hbs`{{config-form config=config saveConfig=(action 'save')}}`);
  this.$(testSelector('dir-input')).val(newPath).trigger('oninput');
  this.$(testSelector('save-btn')).click();
  assert.ok(true);
});
