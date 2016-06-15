import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'exercism-gui/tests/helpers/ember-test-selectors';

moduleForComponent('track-status', 'Integration | Component | track status', {
  integration: true
});

test('it shows no submission message if no problems submitted', function(assert) {
  this.set('status', { recent: { problem: '...any submissions yet...' } });
  this.render(hbs`{{track-status status=status}}`);
  assert.equal(this.$(testSelector('message-empty')).text(), '');
});

test('it shows info of latest problem', function(assert) {
  this.set('status', {
    recent: {
      problem: 'bob',
      submitted_at: null
    },
    submitted: ['foo', 'bar', 'baz']
  });
  this.render(hbs`{{track-status status=status}}`);
  assert.equal(this.$(testSelector('recent-problem')).text(), 'bob');
  assert.equal(this.$(testSelector('submitted')).children().length, 3);
});


