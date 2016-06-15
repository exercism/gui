import { moduleForModel, test } from 'ember-qunit';

moduleForModel('track', 'Unit | Model | track', {
  needs: []
});

test('it returns site url formed with slug', function(assert) {
  let model = this.subject({ slug: 'fake' });
  assert.equal('http://exercism.io/languages/fake', model.get('languageUrl'));
});

test('it returns logo url formed with slug', function(assert) {
  let model = this.subject({ slug: 'fake' });
  assert.equal('http://exercism.io/img/tracks/fake.png', model.get('imageSrc'));
});
