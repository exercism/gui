import { faker } from 'ember-cli-mirage';

export default function() {

  // Exercises API
  this.urlPrefix = 'http://x.exercism.io';
  this.timing = 400;      // delay for each request, automatically set to 0 during testing
  this.get('/tracks');
  this.get('/tracks/:id');

  // Exercism API
  this.urlPrefix = 'http://exercism.io';
  this.namespace = 'api/v1';
  this.get('tracks/:id/status', (schema, request) => {
    let problem = (request.params.id.indexOf('c')) ? 'list-ops' : "You haven't submitted any solutions yet";
    let hash = {
      recent: {
        problem,
        submitted_at: faker.date.recent()
      },
      submitted: ['hello-world', 'bob', 'list-ops'],
      skipped: ['word-count']
    };
    return hash;
  });
}
