import Ember from 'ember';
const notifier = requireNode('node-notifier');

export default Ember.Service.extend({

  notify(message) {
    let notification = message;
    if (typeof message === 'string') {
      notification = { title: 'Excersism GUI', message };
    }
    notifier.notify(notification);
  }
});
