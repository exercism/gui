import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  url: attr('string'),
  slug: attr('string'),
  trackId: attr('string'),
  submit: memberAction({ path: 'assignments', type: 'post' })
});
