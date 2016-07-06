import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

const urlJoin = requireNode('url-join'),
      lodash = requireNode('lodash'),
      url = requireNode('url');

export default ActiveModelAdapter.extend({
  configuration: Ember.inject.service(),

  host: Ember.computed(function() {
    return this.get('configuration.xapi');
  }),

  addKeyParam(fullUrl) {
    let params = url.parse(fullUrl, true).query,
        apiKey = this.get('configuration.apiKey'),
        suffix = '';
    if (lodash.isEmpty(params)) {
      suffix = `?key=${apiKey}`;
    } else if (!params.key) {
      suffix = `&key=${apiKey}`;
    }
    return `${fullUrl}${suffix}`;
  },

  ajax() {
    let [fullUrl, ...rest] = arguments;
    return this._super(this.addKeyParam(fullUrl), ...rest);
  },

  handleResponse: function(status, headers, payload, requestData) {
    if (status === 400 && payload.error && !payload.errors) {
      payload.errors = [
        {
          status: `${status}`,
          title: "The backend responded with an error",
          detail: payload.error
        }
      ];
    }
    return this._super(status, headers, payload, requestData);
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType === 'POST' && modelName === 'problem') {
      // Skip problem
      let track = snapshot.attr('trackId'),
          slug = snapshot.attr('slug');
      return urlJoin(this.get('configuration.api'), `/api/v1/iterations/${track}/${slug}`);
    }
    if (requestType === 'POST' && modelName === 'submission') {
      return urlJoin(this.get('configuration.api'), '/api/v1/user');
    }
    return this._super(modelName, id, snapshot, requestType, query);
  },

  urlForQuery(query, modelName) {
    if (modelName === 'problem') {
      let url = urlJoin(this.get('host'), `/v2/exercises/${query.track_id}`);
      if (query.slug) {
        return urlJoin(url, `${query.slug}`);
      }
      return url;
    }
    return this._super(...arguments);
  },

  urlForQueryRecord(query, modelName) {
    if (modelName === 'submission') {
      return urlJoin(this.get('configuration.api'), `/api/v1/submissions/${query.track_id}/${query.slug}`);
    }
    return this._super(...arguments);
  },

  urlForFindRecord(id, modelName) {
    if (modelName === 'status') {
      return urlJoin(this.get('configuration.api'), `/api/v1/tracks/${id}/status`);
    }
    return this._super(...arguments);
  },

  findRecord (store, type, id, snapshot) {
    return this._super(...arguments).then((response) => {
      if (snapshot.modelName === 'status') {
        response.id = response.track_id;
        response = { status: response };
      }
      return response;
    });
  },

  queryRecord(store, type) {
    return this._super(...arguments).then((response) => {
      if (type.modelName === 'submission') {
        response.id = url.parse(response.url).path.split('/').slice(-1)[0];
        response = { submission: response };
      }
      return response;
    });
  }
});
