import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  uuid: attr('string'),
  url: attr('string'),
  slug: attr('string'),
  trackId: attr('string'),
  username: attr('string'),
  solutionFiles: attr(),
  submit: memberAction({ path: 'assignments', type: 'post' })
});
