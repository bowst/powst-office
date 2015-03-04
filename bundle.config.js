// bundle.config.js 
var react = require('gulp-react');
var lazypipe = require('lazypipe');

var precompileReact = lazypipe().pipe(react,{harmony: true,sourceMap: true});

module.exports = {
  bundle: {
    main: {
      scripts: [
        './app/components/app.js'
      ],
      styles: [
        './app/css/main.css'
      ],
      options: {
        rev: false,
        uglify: false,
        transforms: {
          scripts: precompileReact 
        },
        maps: false
      }
    },
    vendor: {
      scripts: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/lodash/lodash.js',
        './bower_components/moment/moment.js',
        './bower_components/moment/moment.js',
        './bower_components/react/react-with-addons.js',
      ],
      styles: [
        './bower_components/semantic-ui/dist/semantic.css'
      ],
      options: {
        maps: false
      }
    }
  },
  copy: [
    {
      src: [
        './bower_components/semantic-ui/dist/components/',
        './bower_components/semantic-ui/dist/themes/'
      ],
      base: './bower_components/semantic-ui/dist/' 
    }
  ]
};