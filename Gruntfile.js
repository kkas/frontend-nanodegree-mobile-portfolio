module.exports = function(grunt) {

  // My config variables.
  var myConfig = {
    devDir: 'dev',

    // Directories that contain image files. Used as subdirectories.
    imgDir1: 'img',
    imgDir2: 'views/images',

    // Directories that contain resized and optimized image files.
    devSrc1: '<%= myConfig.devDir %>/<%= myConfig.imgDir1 %>',
    devSrc2: '<%= myConfig.devDir %>/<%= myConfig.imgDir2 %>',

    // Directories that contain original image files.
    devOrigSrc1: '<%= myConfig.devDir %>/orig_images/<%= myConfig.imgDir1 %>',
    devOrigSrc2: '<%= myConfig.devDir %>/orig_images/<%= myConfig.imgDir2 %>'
  };

  grunt.initConfig({

    // Load my configs.
    myConfig: myConfig,

    // Task for PageSpeed Insights.
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
      }
    },

    // Resize images
    responsive_images: {
      mytask: {
        options: {
          engine: 'im',
          newFilesOnly: false,
          rename: false,
          quality: 50,
          sizes: [
            {
              width: 120,
              height: 80
            }
          ]
        },
        files: [
          {
            expand: true,
            src: ['<%= myConfig.devOrigSrc2 %>/pizzeria.jpg'],
            dest: '<%= myConfig.devSrc2 %>/',
            flatten: true
          }
        ]
      }
    },

    // Optimize Images
    imageoptim: {
      myPngs: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: [
          '<%= myConfig.devSrc1 %>/*.png',
          '<%= myConfig.devSrc2 %>/*.png'
        ]
      },
      myJpgs: {
        options: {
          jpegMini: true,
          imageAlpha: false,
          quitAfter: true
        },
        src: [
          '<%= myConfig.devSrc1 %>/*.jpg',
          '<%= myConfig.devSrc2 %>/*.jpg'
        ]
      }
    },

    // Clear out the directories for images if it exists
    clean: {
      dev: {
        src: [
          '<%= myConfig.devSrc1 %>',
          '<%= myConfig.devSrc2 %>'
        ]
      }
    },

    // Generate the directories for images if it is missing
    mkdir: {
      dev: {
        options: {
          create: [
            '<%= myConfig.devSrc1 %>',
            '<%= myConfig.devSrc2 %>'
          ]
        }
      }
    },

    // Copy the images
    copy: {
      dev: {
        files: [
          {
            expand: true,
            src: ['<%= myConfig.devOrigSrc1 %>/*.{gif,jpg,png}'],
            dest: '<%= myConfig.devSrc1 %>/',
            flatten: true
          },
          {
            expand: true,
            src: ['<%= myConfig.devOrigSrc2 %>/*.{gif,jpg,png}'],
            dest: '<%= myConfig.devSrc2 %>/',
            flatten: true
          }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task.
  grunt.registerTask('default', ['speedtest']);

  // Project configuration.

  // Tasks to generate optimized images.
  // Run the 'responsive_images' task AFTER the 'copy' to make the
  // modified images override the privious ones.
  grunt.registerTask('image', [
    'clean',
    'mkdir',
    'copy',
    'responsive_images',
    'imageoptim'
  ]);

  // Tasks for PageSpped.
  grunt.registerTask('speedtest', ['pagespeed']);
  grunt.registerTask('pagespeed-desk', ['pagespeed:prod_desktop']);
  grunt.registerTask('pagespeed-mobi', ['pagespeed:prod_mobile']);
};
