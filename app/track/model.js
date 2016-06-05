import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  language: attr('string'),
  active: attr('boolean'),
  repository: attr('string'),
  slug: attr('string'),
  todo: attr(),
  problems: attr()
});
