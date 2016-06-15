import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('track-selector', 'Integration | Component | track selector', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{track-selector}}`);
  assert.equal(this.$().text().trim(), 'Please, select a track');

});
