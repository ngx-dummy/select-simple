module.exports = {
  name: 'select-simple',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/select-simple',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
