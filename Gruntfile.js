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

    // Tasks for minifying css.
    cssmin: {
      options: {
        keepBreaks: false,
        mergeAdjacent: true
      },
      target1: {
        files: [{
          expand: true,
          cwd: '<%= myConfig.devDir %>/css',
          src: ['*.css', '!*.min.css'],
          // Create minified css files with the '.min.css' extention in the
          // same directory.
          dest: '<%= myConfig.devDir %>/css',
          ext: '.min.css'
        }]
      },
      target2: {
        files: [{
          expand: true,
          cwd: '<%= myConfig.devDir %>/views/css',
          src: ['*.css', '!*.min.css'],
          // Create minified css files with the '.min.css' extention in the
          // same directory.
          dest: '<%= myConfig.devDir %>/views/css',
          ext: '.min.css'
        }]
      }
    },

    // Task for inlining CSS.
    critical: {
      dev: {
        options: {
          base: 'dev/',
          css: ['<%= myConfig.devDir %>/css/style.css'],
          minify: true
          // width: ??,
          // height: ??,
        },
        src: '<%= myConfig.devDir %>/index.html',
        dest: '<%= myConfig.devDir %>/index-critical.html'
      }
    },

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
      // Copy images in the dev dir.
      devImg: {
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
      // Make directories for images in the dev dir.
      devImg: {
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
      // Copy original images into the directory for development.
      devImg: {
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
          // Settings for copying all the files, except for index.html.
          {
            expand: true,
            // makes all src relative to cwd
            cwd: '<%= myConfig.devDir %>/',
            src: ['**', '!**/orig_images/**', '!index.html', '!index-critical.html'],
            dest: '<%= myConfig.prodDir %>/',
            // Rename the files with extention '.min.css' to '.css' while coping
            // to the production directory, so that I don't have to change the links
            // in the html files.
            //
            // I knew about this option from the following link:
            // http://stackoverflow.com/questions/15271121/how-can-i-rename-files-with-grunt-based-on-the-respective-files-parent-folder
            rename: function(dest, src) {
              var newName = src.replace(/\.min\.css/, ".css");
              // console.log('src, newName:', src, newName);
              return dest + newName;
            }
          },
          // Settings for copying only index.html. Since grunt-critical generates the
          // production code, 'index-critical.html', I rename the file to 'index.html' and copy it
          // into the prod directory.
          {
            expand: true,
            src: ['<%= myConfig.devDir %>/index-critical.html'],
            dest: '<%= myConfig.prodDir %>/',
            rename: function(dest, src) {
              return dest + 'index.html';
            }
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-critical');

  // Default task.
  grunt.registerTask('default', ['speedtest']);

  // Project configuration.

  // Tasks to generate optimized images.
  // Run the 'responsive_images' task AFTER the 'copy' to make the
  // modified images override the privious ones.
  grunt.registerTask('image', [
    'clean:devImg',
    'mkdir',
    'copy:devImg',
    'responsive_images',
    'imageoptim'
  ]);

  // Tasks for preparing production code.
  grunt.registerTask('prepare', [
    'critical',
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
