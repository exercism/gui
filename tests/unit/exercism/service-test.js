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
  mockFs({ '/t': {} });
  let problems = [{ slug: 'bob', language: 'elixir', files: {} }],
      summary = service.saveProblems(problems, '/t'),
      info = summary[0];
  assert.ok(fs.existsSync('/t/elixir/bob'));
  assert.equal(summary.length, 1);
  assert.equal(info.problem, 'bob');
  assert.deepEqual(info.new, []);
  assert.deepEqual(info.unchanged, []);
});

test('saveProblems skips files that already exist and creates missing', function(assert) {
  let service = this.subject();
  mockFs({ '/t/elixir/bob': { 'problem.ex': 'old_content' } });
  let problems = [{
    slug: 'bob',
    language: 'elixir',
    files: {'problem.ex': 'new_content', 'problem_test.ex': 'b'}
  }];
  let summary = service.saveProblems(problems, '/t'),
      info = summary[0];
  assert.equal(summary.length, 1);
  assert.ok(fs.existsSync('/t/elixir/bob/problem_test.ex'));
  assert.equal(fs.readFileSync('/t/elixir/bob/problem_test.ex').toString(), 'b');
  assert.equal(fs.readFileSync('/t/elixir/bob/problem.ex').toString(), 'old_content');
  assert.deepEqual(info.new, ['problem_test.ex']);
  assert.deepEqual(info.unchanged, ['problem.ex']);
});
