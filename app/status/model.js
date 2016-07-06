import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  fetched: attr(),
  recent: attr(),
  skipped: attr(),
  submitted: attr(),
  trackId: attr('string')
});
