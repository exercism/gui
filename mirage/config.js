import Ember from 'ember';
import { faker, Response } from 'ember-cli-mirage';

export default function() {

  this.passthrough('https://api.github.com/**');

  this.timing = 300;      // delay for each request, automatically set to 0 during testing

  // Exercises API host
  // -------------------
  this.urlPrefix = 'http://x.exercism.io';

  this.get('', () => { // PING request done by debug service
    return new Response(500, {}, {});
  });

  this.get('/tracks');

  this.get('/tracks/:id');

  this.get('/v2/exercises/:track', (schema, request) => {
    let problems = [schema.problems.find(request.params.track)];
    return { problems };
  });

  this.get('/v2/exercises/:track/:slug', (schema, request) => {
    let problems = [schema.problems.find(request.params.track)];
    return { problems };
  });

  this.get('/v2/exercises/restore', (schema) => {
    let ids = ['elixir', 'elixir2', 'python', 'rust', 'erlang'],
        problems = schema.problems.find(ids).models;
    return { problems };
  });

  // Exercism API host
  // -----------------
  this.urlPrefix = 'http://exercism.io';
  this.namespace = 'api/v1';

  this.get('tracks/:id/status', (schema, request) => {
    return schema.statuses.find(request.params.id);
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
