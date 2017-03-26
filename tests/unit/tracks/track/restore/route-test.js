import { moduleFor, test } from 'ember-qunit';

moduleFor('route:tracks/track/restore', 'Unit | Route | tracks/track/restore', {
  // Specify the other units that are required for this test.
  needs: ['service:exercism']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
