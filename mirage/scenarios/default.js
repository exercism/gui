import languages from 'exercism-gui/mirage/factories/languages';

export default function(server) {
  server.createList('track', languages.length);
  server.createList('problem', languages.length);
  server.createList('status', languages.length);
}
