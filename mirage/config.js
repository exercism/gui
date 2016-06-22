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
    let id = request.params.id,
        submitted = faker.random.words(faker.random.number({ min: 1, max: 60 }))
                    .toLowerCase()
                    .split(' '),
        skipped = faker.random.words(faker.random.number({ max: 20 }))
                  .toLowerCase()
                  .split(' '),
        problem = (id.indexOf('c')) ? submitted[0] : "You haven't submitted any solutions yet";
    let hash = {
      track_id: id,
      recent: {
        problem,
        submitted_at: faker.date.recent()
      },
      submitted,
      skipped,
    };
    return hash;
  });

  this.get('submissions/:track/:slug', (schema, request) => {
    let slug = request.params.slug,
        track_id = request.params.track;
    return {
      url: `http://exercism.io/submissions/${faker.random.uuid()}`,
      slug,
      track_id
    };
  });
}
