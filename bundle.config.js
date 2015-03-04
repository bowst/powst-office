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
        uglify: true,
        transforms: {
          scripts: precompileReact 
        },
        maps: false
      }
    },
    vendor: {
      scripts: [
        './app/bower_components/jquery/dist/jquery.js',
        './app/bower_components/lodash/lodash.js',
        './app/bower_components/moment/moment.js',
        './app/bower_components/semantic-ui/dist/semantic.js',
        './app/bower_components/react/react-with-addons.js',
      ],
      styles: [
        './app/bower_components/semantic-ui/dist/semantic.css'
      ],
      options: {
        maps: false
      }
    }
  },
  copy: [
    {
      src: [
        './app/bower_components/semantic-ui/dist/themes/**/*'
      ],
      base: './app/bower_components/semantic-ui/dist/' 
    },
    {
      src:[
        './app/db.php',
        './app/emails.php',
        './app/index.php',
        './app/test.html',
        './app/img/*'
      ],
      base: './app/'
    }
    
  ]
};