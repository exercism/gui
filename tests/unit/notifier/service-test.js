import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

moduleFor('service:notifier', 'Unit | Service | notifier', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it adds a title when plain string', function(assert) {
  let service = this.subject(),
      message = 'my fake message',
      expected = { title: 'Excersism GUI', message };

  service.notifier.notify = td.function();
  service.notify(message);
  td.verify(service.notifier.notify(expected));
  assert.ok(service);
});

test('it adds not title when passing a hash', function(assert) {
  let service = this.subject(),
      message = { title: 'title', message: 'my fake message' };

  service.notifier.notify = td.function();
  service.notify(message);
  td.verify(service.notifier.notify(message));
  assert.ok(service);
});

//TODO: test bad hash passed to notify: no message or no title
