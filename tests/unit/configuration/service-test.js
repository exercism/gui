import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

let fs = requireNode('fs'),
    mockFs = requireNode('mock-fs'),
    fakePath = '/home/fake/e.json';

process.env.EXERCISM_CONFIG_FILE = fakePath;

moduleFor('service:configuration', 'Unit | Service | configuration', {
  afterEach() {
    mockFs.restore();
  }
});

test('it uses config path set in envar', function(assert) {
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
  service.getDefaultHomeExercisesDir = td.function();
  td.when(service.getDefaultHomeExercisesDir()).thenReturn(expected.dir);
  assert.deepEqual(service.readConfigFile(), expected);
});

test('it returns file contents on read', function(assert) {
  let expected = {
        api: 'http://exercism.io',
        xapi: 'http://x.exercism.io',
        apiKey: 'aaabbbccc',
        dir: '/home/fake/exercises',
      };

  mockFs({ '/home/fake/e.json': JSON.stringify(expected) });
  let service = this.subject();
  assert.deepEqual(service.readConfigFile(), expected);
});

test('it writes config file', function(assert) {
  let service = this.subject(),
      config = {
        api: 'http://exercism',
        xapi: 'http://x.exercism',
        apiKey: 'aaabbbccc',
        dir: '/home/fake/exercises',
      };

  mockFs({ '/home/fake/e.json': '' });
  assert.equal(service.api, 'http://exercism.io');
  service.writeConfigFile(config);
  assert.deepEqual(JSON.parse(fs.readFileSync(fakePath)), config);
  assert.equal(service.api, config.api);
});

test('isConfigured returns false only if API key is empty', function(assert) {
  let config = {
        api: 'http://exercism',
        xapi: 'http://x.exercism',
        dir: '/home/fake/exercises',
      };

  mockFs({ '/home/fake/e.json': JSON.stringify(config) });
  let service = this.subject();

  assert.notOk(service.get('isConfigured'));

  config.apiKey = null;
  service.update(config);
  assert.notOk(service.get('isConfigured'));

  config.apiKey = '';
  service.update(config);
  assert.notOk(service.get('isConfigured'));

  config.apiKey = 'somekey';
  service.update(config);
  assert.ok(service.get('isConfigured'));
});
