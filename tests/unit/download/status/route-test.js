import { moduleFor, test } from 'ember-qunit';

moduleFor('route:download/status', 'Unit | Route | download/status', {
  needs: ['service:exercism']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
