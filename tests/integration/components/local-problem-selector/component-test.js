import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('local-problem-selector', 'Integration | Component | local problem selector', {
  integration: true
});

test('it shows a message if problems is an empty list', function(assert) {
  this.set('problems', []);
  this.render(hbs`{{local-problem-selector problems=problems}}`);

  assert.equal(this.$(testSelector('no-problems-msg')).text().trim(), 'No problem files found under this track');
});

test('it shows no files or dir if problem was not selected', function(assert) {
  this.set('problems', [ { name: 'bob', files: [], dir: '/aaa' } ]);
  this.render(hbs`{{local-problem-selector problems=problems}}`);

  assert.equal(this.$(testSelector('dir')).text().trim(), '');
  assert.equal(this.$(testSelector('file-selector')).text().trim(), '');
});

test('it shows dir and file selector if problem was selected', function(assert) {
  let problem = { name: 'bob', files: [], dir: '/aaa' };
  this.set('problems', [problem]);
  this.set('problem', problem);
  this.render(hbs`{{local-problem-selector problems=problems selectedProblem=problem}}`);

  assert.equal(this.$(testSelector('dir')).text().trim(), '/aaa');
  assert.equal(this.$(testSelector('no-files-msg')).text().trim(), 'None');
});
