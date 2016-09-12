import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

const mockFs = requireNode('mock-fs');

moduleForComponent('file-selector', 'Integration | Component | file selector', {
  integration: true,
  afterEach() {
    mockFs.restore();
  }
});

test('it renders one radio button per file', function(assert) {
  let problem = { files: ['f1', 'f2', 'f3', 'f4'] };
  this.set('problem', problem);

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('files')).length, problem.files.length);
});

test('it shows message when no files available', function(assert) {
  this.set('problem', { files: [] });

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('no-files-msg')).text().trim(), 'None');
});

test('it disables submit button if no selection', function(assert) {
  let problem = { files: ['f1'] };
  this.set('problem', problem);

  this.render(hbs`{{file-selector problem=problem}}`);
  assert.equal(this.$(testSelector('files')).length, 1);
  assert.ok(this.$(testSelector('submit-btn')).hasClass('disabled'));
});

test('it shows error message if file no longer exists', function(assert) {
  let problem = { files: ['f1', 'f2'], dir: '/some/dir/bob', name: 'bob' };
  this.set('problem', problem);
  this.set('selectedFile', 'f2');
  let submit = () => {};
  this.set('actions', { submit });

  this.render(hbs`{{file-selector problem=problem selectedFile=selectedFile submit=(action "submit")}}`);
  assert.equal(this.$(testSelector('error-msg')).text(), '');
  this.$(testSelector('submit-btn')).click();
  assert.equal(this.$(testSelector('error-msg')).text().trim(), 'The file /some/dir/bob/f2 no longer exists');

});
