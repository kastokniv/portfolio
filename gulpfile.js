var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

// Compile pug files into HTML
gulp.task('pug', function () {
  return gulp.src('src/pug/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
    pretty:true  // to keep files as it is in pug
    }))
    .pipe(gulp.dest('dist'));
});

// Compile sass files into CSS
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['src/sass'],
      errLogToConsole: true,
      outputStyle: 'expanded',  // to expand the normal version of css
      onError: browserSync.notify
    }))
    .pipe(postcss([autoprefixer({grid:true})]))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Serve and watch sass/pug files for changes
gulp.task('watch', ['pug', 'sass',], function () {
  browserSync.init({
      server: './dist',
  }),
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/pug/*.pug', ['pug']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
