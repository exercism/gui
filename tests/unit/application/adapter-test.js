import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | application', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('it adds key params if no params', function(assert) {
  let adapter = this.subject();
  adapter.configuration = { apiKey: 'fake' };
  assert.equal(adapter.addKeyParam('http://a.com/api/'), 'http://a.com/api/?key=fake');
});

test('it adds key param when url has params', function(assert) {
  let adapter = this.subject();
  adapter.configuration = { apiKey: 'fake' };
  assert.equal(adapter.addKeyParam('http://a.com/api?a=1&b=2'), 'http://a.com/api?a=1&b=2&key=fake');
});

test('it avoids adding the key param if already there', function(assert) {
  let adapter = this.subject();
  adapter.configuration = { apiKey: 'fake' };
  assert.equal(adapter.addKeyParam('http://a.com/api?a=1&key=k'), 'http://a.com/api?a=1&key=k');
});
