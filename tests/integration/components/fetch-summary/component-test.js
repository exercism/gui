import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('fetch-summary', 'Integration | Component | fetch summary', {
  integration: true
});

test('it renders several problems', function(assert) {
  let summary = [
    { problem: 'a', new: ['f1.a', 'f2.a'] },
    { problem: 'b', new: ['f1.b'], unchanged: ['f2.b'] },
    { problem: 'c', unchanged: ['f1.c', 'f2.c', 'f3.c'] }
  ];

  this.set('summary', summary);
  this.render(hbs`{{fetch-summary summary=summary}}`);

  assert.equal(this.$(testSelector('new-files', 'a')).children().length, 2);
  assert.equal(this.$(testSelector('unchanged-files', 'a')).children().length, 0);

  assert.equal(this.$(testSelector('new-files', 'b')).children().length, 1);
  assert.equal(this.$(testSelector('unchanged-files', 'b')).children().length, 1);

  assert.equal(this.$(testSelector('new-files', 'c')).children().length, 0);
  assert.equal(this.$(testSelector('unchanged-files', 'c')).children().length, 3);
});
