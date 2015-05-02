Package.describe({
  name: 'mfactory:devtools',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  api.use([
    'templating',
    'aldeed:template-extension@3.4.3'
  ], 'client');

  api.addFiles([
    'style.css',
    'devtools.js'
  ], 'client');
});
