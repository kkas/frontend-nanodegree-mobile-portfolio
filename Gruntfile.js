module.exports = function(grunt) {

  // My config variables.
  var myConfig = {
    devDir: 'dev',
    prodDir: 'prod',

    // Directories that contain image files. Used as subdirectories.
    imgDir1: 'img',
    imgDir2: 'views/images',

    // Directories that contain resized and optimized image files.
    devImgSrc1: '<%= myConfig.devDir %>/<%= myConfig.imgDir1 %>',
    devImgSrc2: '<%= myConfig.devDir %>/<%= myConfig.imgDir2 %>',

    // Directories that contain original image files.
    devOrigImgSrc1: '<%= myConfig.devDir %>/orig_images/<%= myConfig.imgDir1 %>',
    devOrigImgSrc2: '<%= myConfig.devDir %>/orig_images/<%= myConfig.imgDir2 %>'
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
            src: ['<%= myConfig.devOrigImgSrc2 %>/pizzeria.jpg'],
            dest: '<%= myConfig.devImgSrc2 %>/',
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
          '<%= myConfig.devImgSrc1 %>/*.png',
          '<%= myConfig.devImgSrc2 %>/*.png'
        ]
      },
      myJpgs: {
        options: {
          jpegMini: true,
          imageAlpha: false,
          quitAfter: true
        },
        src: [
          '<%= myConfig.devImgSrc1 %>/*.jpg',
          '<%= myConfig.devImgSrc2 %>/*.jpg'
        ]
      }
    },

    // Clear out the directories for images if it exists
    clean: {
      dev: {
        src: [
          '<%= myConfig.devImgSrc1 %>',
          '<%= myConfig.devImgSrc2 %>'
        ]
      },
      prod: {
        src: ['<%= myConfig.prodDir %>']
      }
    },

    // Generate the directories for images if it is missing
    mkdir: {
      dev: {
        options: {
          create: [
            '<%= myConfig.devImgSrc1 %>',
            '<%= myConfig.devImgSrc2 %>'
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
            src: ['<%= myConfig.devOrigImgSrc1 %>/*.{gif,jpg,png}'],
            dest: '<%= myConfig.devImgSrc1 %>/',
            flatten: true
          },
          {
            expand: true,
            src: ['<%= myConfig.devOrigImgSrc2 %>/*.{gif,jpg,png}'],
            dest: '<%= myConfig.devImgSrc2 %>/',
            flatten: true
          }
        ]
      },
      prod: {
        files: [
          {
            expand: true,
            // makes all src relative to cwd
            cwd: '<%= myConfig.devDir %>/',
            src: ['**', '!**/orig_images/**'],
            dest: '<%= myConfig.prodDir %>/'
          }
        ]
      }
    },

    // Execute shell scripts.
    shell: {
      deployToGhPages: {
        command: './deploy.sh prod'
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
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('default', ['speedtest']);

  // Project configuration.

  // Tasks to generate optimized images.
  // Run the 'responsive_images' task AFTER the 'copy' to make the
  // modified images override the privious ones.
  grunt.registerTask('image', [
    'clean:dev',
    'mkdir',
    'copy:dev',
    'responsive_images',
    'imageoptim'
  ]);

  // Tasks for preparing production code.
  grunt.registerTask('prepare', [
    'clean:prod',
    'copy:prod'
  ]);

  // Task to deploy production codes to gh-pages
  grunt.registerTask('deploy', [
    'prepare',
    'shell:deployToGhPages'
  ]);

  // Tasks for PageSpped.
  grunt.registerTask('speedtest', ['pagespeed']);
  grunt.registerTask('pagespeed-desk', ['pagespeed:prod_desktop']);
  grunt.registerTask('pagespeed-mobi', ['pagespeed:prod_mobile']);
};
