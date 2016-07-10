import { Factory, faker } from 'ember-cli-mirage';
import languages from 'exercism-gui/mirage/factories/languages';

export default Factory.extend({
  id(i) {
    return languages[i].toLowerCase();
  },

  track_id(i) {
    return languages[i].toLowerCase();
  },

  submitted() {
    let problems = faker.random.words(faker.random.number({ max: 60 }))
                   .toLowerCase()
                   .split(' ');

    problems.push('exercism-gui-fake-problem');

    return problems;
  },

  skipped() {
    return faker.random.words(faker.random.number({ max: 20 }))
           .toLowerCase()
           .split(' ');
  },

  recent(i) {
    let lang = languages[i].toLowerCase();
    let problem = (lang.indexOf('c')) ? 'exercism-gui-fake-problem' :  'You haven\'t submitted any solutions yet';
    return {
      problem,
      submitted_at: faker.date.recent()
    };
  }
});
