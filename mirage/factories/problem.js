import { Factory } from 'ember-cli-mirage';
import languages from 'exercism-gui/mirage/factories/languages';

export default Factory.extend({
  id(i) {
    return languages[i].toLowerCase();
  },
  track_id(i) {
    return languages[i].toLowerCase();
  },
  language(i) {
    return languages[i].toLowerCase();
  },
  slug: 'exercism-gui-fake-problem',
  name: 'Fake problem',
  files: {
      'problem': 'problem',
      'problem_tests': 'tests',
      'nested/dir/file1': 'aaaa',
      'README.md': 'readme'
  },
  fresh: false
});
