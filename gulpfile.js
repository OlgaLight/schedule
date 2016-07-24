// 'use strict';
// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     uglify = require('gulp-uglify'),
//     jshint = require('gulp-jshint'),
//     stylish = require('jshint-stylish'),
//     browserSync = require('browser-sync').create();
//  
// gulp.task('styles', function () {
//   gulp.src('./styles/style.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('./css'))
//       .pipe(browserSync.reload({stream: true}));
// });
//
// gulp.task('usemin',['jshint'], function () {
//   return gulp.src('./app/index.html')
//       .pipe(usemin({
//         css:[minifycss(),rev()],
//         js: [uglify(),rev()]
//       }))
//       .pipe(gulp.dest('dist/'));
// });
//
// gulp.task('jshint', function() {
//   return gulp.src('app/scripts/*.js')
//       .pipe(jshint())
//       .pipe(jshint.reporter(stylish));
// });
//
// gulp.task('serve', function () {
//   browserSync.init({
//     server: {
//       baseDir: './'
//     }
//   });
//
//   gulp.watch('./scss/*.scss', ['styles']);
//   gulp.watch('./**/*.html').on('change', browserSync.reload);
// });
//
// gulp.task('default', ['styles', 'usemin', 'serve']);





var gulp = require('gulp'),   
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
   
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin');
});

gulp.task('usemin',['jshint'], function () {
  return gulp.src('./app/index.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [uglify(),rev()]
      }))
      .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/images'))
      .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});
gulp.task('styles', function () {
  gulp.src('./styles/style.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['default'], function () {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'
  ];

  browserSync.init(files, {
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});


