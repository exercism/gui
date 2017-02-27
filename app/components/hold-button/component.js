import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  delay: 300,

  mouseUp() {
    this.set('countdown', null);
    this.get('task').cancelAll();
  },

  clickedTask: task(function * () {
    this.set('pulsate', true);
    yield timeout(100);
    this.set('pulsate', false);
  }).on('click'),

  task: task(function * () {
    let countdown = 4;

    while(countdown > 0) {
      yield timeout(this.get('delay'));
      countdown -= 1;
      this.set('countdown', countdown);
    }

    this.set('countdown', null);

    this.get('attrs').action();
  }).on('mouseDown').restartable()

});
