# Website Performance Optimization Portfolio Project

## ***Notes***
* I have made the two different directories that represent the environments, "dev", and "prod", for development and production respectively. The directory structures inside of those directories are almost the same as the original one that we are provided.

* The production code are hosted on [**GitHub Page**](http://kkas.github.io/frontend-nanodegree-mobile-portfolio) for this repository. However, they contain only the production code (the files stored in the "prod" directory).

  * In order to achieve this, I have added and used the grunt task, "deploy". See Gruntfile.js for more details.

### *Directory Structure*:
  * (project root directory)
    * dev
      * (contains files that are not minimized (I make changes the files in this directory most of the time))
    * prod
      * (contains only generated files for production from the 'dev' directory)
      * (e.g. minified version files of css and js. These are generated by the grunt tasks)

## **The CRP(Critical Rendering Path) Optimization**

### *Objective*:

* to aquire the score above 90 at [***PageSpeed Insights***](https://developers.google.com/speed/pagespeed/insights/?hl=ja) for Both Mobile and Desktop

### *Changes I have made*:

* resized and optimized all the image files by using ['*grunt-imageoptim*'](https://github.com/JamieMason/grunt-imageoptim) and ['*grunt-responsive-images*'](https://github.com/andismith/grunt-responsive-images).

* in index.html:
  * removed render-blocking scripts by:
    * changed to load the webfonts asynchronously
    * added the async property for google analytics script
  * inlined the critical css and made non-critical css gets loaded asynchronously by ['*grunt-critical*'](https://github.com/bezoerb/grunt-critical)
  * added the print media query
  * minified the css and javascripts by ['*grunt-critical*'](https://github.com/bezoerb/grunt-critical), ['grunt-contrib-cssmin'](https://github.com/gruntjs/grunt-contrib-cssmin), and [*'grunt-contrib-uglify*'](https://github.com/gruntjs/grunt-contrib-uglify)
  * changed to use the particular, optimized image of 'pizzeria.jpg'


## **The Browser Rendering Optimization**

### *Objective*:
* to aquire 60 fps on scrolling
* to aquire under 5ms on resizing the pizza images

### *Changes I have made in main.js*:

* for improvements for scrolling
  * in updatePositions()
    * changed to read the 'body.scrollTop' outside and before the iteration to avoid the big layout thrashing
    * precalculated all the 5 possible variations of the delta values
    * used translateX() to move the pizzas, instead of setting left property to avoid the layout executions
    * replaced querySelectorAll() with getElementsByClassName() for faster serach

  * in the anonymous function for DOMContentLoaded event
    * removed the unnecessary drawing for the pizzaz by reducing the number of the mover pizzas to the appropriate one
    * added the 'will-change' properties to the mover pizzas

* for improvements for resizing pizzas
  * in changePizzaSizes()
    * simplified the calculation of the new sizes of the pizzas, instead of calculating the width by hands in the complex way, and removed the FSLs(Forced synchronous layouts)
      * deleted the unnecessary function, determineDx()
    * replaced querySelectorAll() with getElementsByClassName() for faster search

## The description of the assignment (Provided By Udacity)

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

#### Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

#### Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

---
*If you have any questions, please send me an inquiry by email: kentakikui@gmail.com*