import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  delay: 300,

  mouseUp() {
    this.set('countdown', null);
    this.get('task').cancelAll();
  },

  task: task(function * () {
    let countdown = 4;

    while(countdown > 0) {
      yield timeout(this.get('delay'));
      countdown -= 1;
      this.set('countdown', countdown);
    }

    this.set('countdown', null);

    this.attrs.action();
  }).on('mouseDown').restartable()

});
