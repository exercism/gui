import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

let mockFs = requireNode('mock-fs'),
    fakePath = '/home/fake/';

process.env.EXERCISM_CONFIG_FILE = fakePath + 'e.json';

moduleFor('service:configuration', 'Unit | Service | configuration', {
  afterEach() {
    mockFs.restore();
  }
});

test('it uses config path set in envar', function(assert) {
  mockFs({
    fakePath: { 'e.json': '' }
  });
  let service = this.subject();
  assert.equal('/home/fake/e.json', service.getConfigFilePath());
});

test('it returns defaults if config file does not exists', function(assert) {
  let service = this.subject(),
      expected = {
        api: 'http://exercism.io',
        xapi: 'http://x.exercism.io',
        apiKey: null,
        dir: '/home/fake/exercises',
      };
  service.getHomeExercisesDir = td.function();
  td.when(service.getHomeExercisesDir()).thenReturn(expected.dir);
  assert.deepEqual(service.readConfigFile(), expected);
});
