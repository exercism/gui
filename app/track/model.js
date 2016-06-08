import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  language: attr('string'),
  active: attr('boolean'),
  repository: attr('string'),
  slug: attr('string'),
  todo: attr(),
  problems: attr(),

  languageUrl: Ember.computed('slug', function() {
    return `http://exercism.io/languages/${this.get('slug')}`;
  }),
  imageSrc: Ember.computed('slug', function() {
    return `http://exercism.io/img/tracks/${this.get('slug')}.png`;
  })
});
