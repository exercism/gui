import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tracks', function() {
    this.route('track', { path: ':track_id' }, function() {
      this.route('status', function() {
        this.route('submission', { path: 'submission/:slug' });
      });
    });
  });
  this.route('configuration');
});

export default Router;
