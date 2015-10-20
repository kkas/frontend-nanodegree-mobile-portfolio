module.exports = function(grunt) {

  grunt.initConfig({
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
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-pagespeed');

  // Default task.
  grunt.registerTask('default', ['jshint']);
  // Project configuration.

  // Tasks for PageSpped.
  grunt.registerTask('speedtest', ['pagespeed']);
  grunt.registerTask('pagespeed-desk', ['pagespeed:prod_desktop']);
  grunt.registerTask('pagespeed-mobi', ['pagespeed:prod_mobile']);
};
