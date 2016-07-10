import { ActiveModelSerializer } from 'ember-cli-mirage';

export default ActiveModelSerializer.extend({
  serialize(object) {
    let json = ActiveModelSerializer.prototype.serialize.apply(this, arguments);
    if (object.modelName === 'status') {
      return json.status;
    }
    return json;
  }
});
