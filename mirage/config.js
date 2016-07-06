import Ember from 'ember';
import { faker, Response } from 'ember-cli-mirage';

export default function() {

  this.timing = 300;      // delay for each request, automatically set to 0 during testing

  // Exercises API host
  this.urlPrefix = 'http://x.exercism.io';

  this.get('/tracks');

  this.get('/tracks/:id');

  this.get('/v2/exercises/:track', (schema, request) => {
    let track = request.params.track,
        slug = 'exercism-gui-fake-problem';

    return {
      problems: [{
        id: 'fake',
        track_id: track,
        language: track,
        slug: slug,
        name: Ember.String.capitalize(slug),
        files: {
            'problem.rs': 'problem',
            'problem_tests.rs': 'tests',
            'nested/dir/file1': 'aaaa',
            'README.md': 'readme'
        },
        fresh: false
      }]
    };

  });

  // Exercism API host
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

    return {
      id,
      track_id: id,
      recent: {
        problem,
        submitted_at: faker.date.recent()
      },
      submitted,
      skipped,
    };

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

  this.post('iterations/:track/:slug/skip', () => {
    return new Response(204, {}, {});
  });

  this.post('user/assignments', (schema, request) => {
    const attrs = JSON.parse(request.requestBody);
    if (attrs.language === 'bash') {
      return new Response(400, {}, { error: 'duplicate of previous iteration' });
    }
    if (attrs.language === 'perl6') {
      return new Response(500, {}, { errors: ['some error'] });
    }
    let id = faker.random.uuid(),
        submissionPath = `submissions/${id}`;
    let data = {
      id,
      iteration: faker.random.number({ min: 1, max: 25 }),
      status: 'saved',
      slug: attrs.problem,
      track: attrs.language,
      exercise: attrs.problem,
      track_id: attrs.language,
      submission_path: `/${submissionPath}`,
      url: `http://exercism.io/${submissionPath}`,
      language: Ember.String.capitalize(attrs.language),
      name: Ember.String.capitalize(attrs.problem),
    };
    return new Response(201, {}, data);
  });
}
