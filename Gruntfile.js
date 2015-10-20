/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    pagespeed: {
      options: {
        nokey: true
      },
      prod_desktop: {
        options: {
          url: "http://kkas.github.io/frontend-nanodegree-mobile-portfolio/",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 90
        }
      },
      prod_mobile: {
        options: {
          url: "http://kkas.github.io/frontend-nanodegree-mobile-portfolio/",
          locale: "en_GB",
          strategy: "mobile",
          threshold: 90
        }
      },
    },
    responsive_images: {
      mytask: {
        options: {
          engine: 'im',
          newFilesOnly: false,
          rename: false,
          quality: 50,
          sizes: [{
            width: 120,
            height: 80
          }]
        },
        files: [{
          expand: true,
          src: ['views/images/pizzeria.jpg']
        }]
      }
    },
    imageoptim: {
      myPngs: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['img/*.png', 'views/images/*.png']
      },
      myJpgs: {
        options: {
          jpegMini: true,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['img/*.jpg', 'views/images/*.jpg']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task.
  grunt.registerTask('default', ['jshint']);
  // Project configuration.
  grunt.registerTask('image-opt', ['responsive_images', 'imageoptim']);

  // Tasks for PageSpped.
  grunt.registerTask('speedtest', ['pagespeed']);
  grunt.registerTask('pagespeed-desk', ['pagespeed:prod_desktop']);
  grunt.registerTask('pagespeed-mobi', ['pagespeed:prod_mobile']);
};
