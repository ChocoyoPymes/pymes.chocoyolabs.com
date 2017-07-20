// npm i --save gulp gulp-concat gulp-rename gulp-uglify gulp-clean-css
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var jsFiles = [
  '_assets/js/jquery.min.js',
  '_assets/js/jquery-noconflict.js',
  '_assets/js/jquery-migrate.min.js',
  '_assets/js/bootstrap.min.js',
  '_assets/js/chosen.jquery.min.js',
  '_assets/js/jquery.mixitup.min.js',
  '_assets/js/jquery.fancybox.pack.js',
  '_assets/js/jquery.fancybox-thumbs.js',
  '_assets/js/jquery.pep.js',
  '_assets/js/scripts.js',
  '_assets/js/jquery.cookies.js',
  '_assets/js/style_switcher_demo.js',
  '_assets/js/jquery.validate.min.js',
  '_assets/js/additional-methods.min.js',
  '_assets/js/autosize.min.js',
  '_assets/js/ajaxsendmail.js',
  '_assets/js/3746c53881af011da687b3b1b54db575.js',
  '_assets/js/964a07b4f88d076a623ebcd4ba52fa1d.js',
  '_assets/js/jquery.owl-carousel.js',
  '_assets/js/progress.min.js',
  '_assets/js/swiper.min.js',
  '_assets/js/menu.js',
  '_assets/js/jquery.rd-navbar.js',
  '_assets/js/site.js',
  '_assets/js/googlemapsv3.js'
];

var jsDest = 'assets/js';

var cssFiles = [
  '_assets/css/joom_settings.css',
  '_assets/css/joomgallery.css',
  '_assets/css/chosen.css',
  '_assets/css/jquery.fancybox.css',
  '_assets/css/jquery.fancybox-buttons.css',
  '_assets/css/jquery.fancybox-thumbs.css',
  '_assets/css/fancybox.css',
  '_assets/css/template.css',
  '_assets/css/font-awesome.css',
  '_assets/css/gallery.css',
  '_assets/css/komento.css',
  '_assets/css/style1.css',
  '_assets/css/color_scheme_1.css',
  '_assets/css/style2.css',
  '_assets/css/common.css',
  '_assets/css/default1.css',
  '_assets/css/default2.css',
  '_assets/css/style3.css',
  '_assets/css/owl-carousel.css',
  '_assets/css/swiper.css',
  '_assets/css/animate.css',
  '_assets/css/navbar.css',
  '_assets/css/lrstyle.css'
];
var cssDest = '_sass';

// javascripts
gulp.task('build:javascripts', function () {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

// stylesheets
gulp.task('build:stylesheets', function () {
  return gulp.src(cssFiles)
    .pipe(concat('application.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(rename('application.min.scss'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDest));
});

gulp.task('default', [
  'build:javascripts',
  'build:stylesheets'
]);