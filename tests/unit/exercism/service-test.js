import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

let fs = requireNode('fs'),
    mockFs = requireNode('mock-fs');

moduleFor('service:exercism', 'Unit | Service | exercism', {
  afterEach() {
    mockFs.restore();
  }
});

test('saveProblems makes track and problem dirs if dont exists', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t': {} });
  let Problem = Ember.Object.extend({
        slug: 'bob',
        language: 'elixir',
        files: { f1: 'aa' }
      }),
      problems = [Problem.create()],
      summary = service.saveProblems(problems),
      info = summary[0];
  assert.ok(fs.existsSync('/t/elixir/bob'));
  assert.equal(summary.length, 1);
  assert.equal(info.problem, 'bob');
  assert.deepEqual(info.new, ['f1']);
  assert.deepEqual(info.unchanged, []);
});

test('saveProblems make dirs recursively', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t': {} });
  let Problem = Ember.Object.extend({
        slug: 'leap',
        language: 'c',
        files: {
          'ex.c': 'content0',
          'test/vendor/aaa.c': 'content1',
          'nested-folder/bbb.c': 'content2'
        }
      }),
      problems = [Problem.create()];
  service.saveProblems(problems, '/t');
  assert.ok(fs.existsSync('/t/c/leap/ex.c'));
  assert.ok(fs.existsSync('/t/c/leap/test/vendor/aaa.c'));
  assert.ok(fs.existsSync('/t/c/leap/nested-folder/bbb.c'));
});

test('saveProblems skips files that already exist and creates missing', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/elixir/bob': { 'problem.ex': 'old_content' } });
  let Problem = Ember.Object.extend({
        slug: 'bob',
        language: 'elixir',
        files: {'problem.ex': 'new_content', 'problem_test.ex': 'b'}
      }),
      problems = [Problem.create()],
      summary = service.saveProblems(problems, '/t'),
      info = summary[0];
  assert.equal(summary.length, 1);
  assert.ok(fs.existsSync('/t/elixir/bob/problem_test.ex'));
  assert.equal(fs.readFileSync('/t/elixir/bob/problem_test.ex').toString(), 'b');
  assert.equal(fs.readFileSync('/t/elixir/bob/problem.ex').toString(), 'old_content');
  assert.deepEqual(info.new, ['problem_test.ex']);
  assert.deepEqual(info.unchanged, ['problem.ex']);
});

test('getLocalProblems filters out invalid dirs', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/elixir/bob': {}, '/t/elixir/bad-one': {} });
  let problems = service.getLocalProblems('elixir', ['bob']);
  assert.equal(problems.length, 1);
  assert.equal(problems[0].name, 'bob');
});

test('getLocalProblems returns empty list if no track dir', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/': {} });
  let problems = service.getLocalProblems('elixir', ['bob']);
  assert.equal(problems.length, 0);
});

test('getLocalProblems returns empty list if track dir is not a dir', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/elixir': 'file content' });
  let problems = service.getLocalProblems('elixir', ['bob']);
  assert.equal(problems.length, 0);
});

test('getLocalProblems returns empty list if problem dir is not a dir', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/elixir/bob': 'file content' });
  let problems = service.getLocalProblems('elixir', ['bob']);
  assert.equal(problems.length, 0);
});

test('getLocalProblems returns empty list if no problem dir', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({ '/t/elixir': {} });
  let problems = service.getLocalProblems('elixir', ['bob']);
  assert.equal(problems.length, 0);
});

test('getLocalProblems lists all files in a dir and excludes tests and readme', function(assert) {
  let service = this.subject();
  service.configuration = { dir: '/t' };
  mockFs({
    '/t/elixir': {
      'bob': {
        'bob.ex': 'a',
        'some_file': 'b',
        'test_bob.ex': 'c',
        'bobTest.ex': 'd'
      },
      'hello-world': {
        'hello_world.ex': 'a',
        'hello_world_test.ex': 'b',
        'README.md': 'c'
      }
    }
  });
  let problems = service.getLocalProblems('elixir', ['bob', 'hello-world']),
      expected = [
    { name: 'bob', files: ['bob.ex', 'some_file'], dir: '/t/elixir/bob' },
    { name: 'hello-world', files: ['hello_world.ex'], dir: '/t/elixir/hello-world' }
  ];
  assert.deepEqual(problems, expected);
});

test('extracts details from path', function(assert) {
  let service = this.subject(),
      filePath = 'C:\\t\\elixir\\bob\\file.ex';
  let { fileName, problem, language } = service._extractInfoFromFilePath(filePath, 'C:\\t', '\\');
  assert.equal(fileName, 'file.ex');
  assert.equal(problem, 'bob');
  assert.equal(language, 'elixir');
});

test('extracts details from path with nested folders', function(assert) {
  let service = this.subject(),
      filePath = '/t/exercism/elixir/bob/nested/folder/file.ex';
  let { fileName, problem, language } = service._extractInfoFromFilePath(filePath, '/t/exercism', '/');
  assert.equal(fileName, 'file.ex');
  assert.equal(problem, 'bob');
  assert.equal(language, 'elixir');
});
