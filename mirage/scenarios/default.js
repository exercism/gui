import languages from 'exercism-gui/mirage/factories/languages';

export default function(server) {
  server.createList('track', languages.length);
  server.createList('problem', languages.length);
  server.createList('status', languages.length);
  server.create('problem', {
    id: 'elixir2',
    track_id: 'elixir',
    language: 'elixir',
    slug: 'exercism-gui-fake-problem-2'
  });
}
