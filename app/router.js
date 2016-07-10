import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tracks', function() {
    this.route('track', { path: ':track_id' }, function() {
      this.route('fetch');

      this.route('status', function() {
        this.route('submission', { path: 'submission/:slug' });
      });

      this.route('problems', function() {
        this.route('problem', { path: ':problem_id' }, function() {
          this.route('skip');
        });
      });
      this.route('local-problems');
      this.route('local-problems.submit', { path: 'local-problems/:path/submit' });
      this.route('restore');
    });
  });
  this.route('configuration');
});

export default Router;
