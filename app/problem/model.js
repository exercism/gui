import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { memberAction, classOp } from 'ember-api-actions';

export default Model.extend({

  trackId: attr('string'),
  language: attr('string'),
  slug: attr('string'),
  name: attr('string'),
  files: attr(),
  fresh: attr('boolean'),
  skip: memberAction({ path: 'skip', type: 'post' }),
  restoreAll: classOp({ path: 'restore', type: 'get' })

});
