var del = require('del');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmltpl = require('gulp-html-tpl');
var artTemplate = require('art-template');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

artTemplate.defaults.rules.unshift({
  test: /{{raw}}([\w\W]*?){{\/raw}}/,
  use: function(match, code) {
    return {
      output: 'raw',
      code: JSON.stringify(code),
    };
  },
});

var paths = {
  src: {
    style: 'src/style/',
    styleLib: 'src/style/libs/*.css',
    CSS: 'src/assets/css/',
    script: 'src/script/',
    scriptLib: 'src/script/libs/*.js',
    JS: 'src/assets/js/',
    views: 'src/views/',
    pages: 'src/pages/',
    images: 'src/images/',
    data: 'src/data/',
  },
  build: {
    root: 'build/',
    CSS: 'build/assets/css/',
    JS: 'build/assets/js/',
    pages: 'build/pages/',
    images: 'build/images/',
    data: 'build/data/',
  },
};

// task src
gulp.task('delHtml', function() {
  return del([paths.src.pages + '**/*']);
});

gulp.task('compilePublic', ['delHtml'], function() {
  return gulp
    .src(paths.src.views + '**/*')
    .pipe(
      htmltpl({
        engine: function(template, data) {
          if (!template) {
            return false;
          }
          return artTemplate.compile(template)(data);
        },
      })
    )
    .pipe(gulp.dest(paths.src.pages))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('compileHtml', function() {
  return gulp
    .src([
      paths.src.views + '**/*.html',
      '!' + paths.src.views + 'public/*.html',
    ])
    .pipe(changed(paths.src.pages))
    .pipe(
      htmltpl({
        engine: function(template, data) {
          if (!template) {
            return false;
          }
          return artTemplate.compile(template)(data);
        },
      })
    )
    .pipe(gulp.dest(paths.src.pages))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task('sass', function() {
  return (
    gulp
      .src(paths.src.style + 'module/*.scss')
      .pipe(
        changed(paths.src.CSS, {
          extension: '.css',
        })
      )
      // .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(
        postcss([
          autoprefixer({
            browsers: [
              'last 4 versions',
              'not ie <= 8',
              'Android >= 4.0',
              'ios > 7',
              'ff >= 15',
            ],
          }),
        ])
      )
      // .pipe(sourcemaps.write("./maps"))
      .pipe(gulp.dest(paths.src.CSS))
      .pipe(
        browserSync.reload({
          stream: true,
        })
      )
  );
});

gulp.task('scriptbabel', function() {
  return gulp
    .src(paths.src.script + 'es6/*.js')
    .pipe(changed(paths.src.JS))
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(gulp.dest(paths.src.JS));
});

gulp.task('scriptmin', function() {
  return gulp
    .src(paths.src.scriptLib)
    .pipe(concat('core.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.src.JS));
});

gulp.task('cssmin', function() {
  return gulp
    .src(paths.src.styleLib)
    .pipe(concat('core.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.src.CSS));
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
    port: 3001,
    startPath: '/pages',
  });
});

gulp.task('watch', ['server'], function() {
  var views = gulp.watch(
    [paths.src.views + '**/*.html', '!' + paths.src.views + 'public/*.html'],
    ['compileHtml']
  );
  gulp.watch(paths.src.views + 'public/*.html', ['compilePublic']);
  gulp.watch(paths.src.style + '**/*.scss', ['sass']);
  gulp.watch(paths.src.script + 'es6/*.js', ['scriptbabel']);
  gulp.watch(paths.src.scriptLib, ['scriptmin']);
  gulp.watch(paths.src.styleLib, ['cssmin']);
});

gulp.task('default', ['watch']);

// task src end

// build task
gulp.task('delbuild', function() {
  return del([paths.build.root + '**/*']);
});

gulp.task('moveData', ['delbuild'], function() {
  return gulp.src(paths.src.data + '**/*').pipe(gulp.dest(paths.build.data));
});

gulp.task('moveScript', ['moveData'], function() {
  return gulp
    .src(paths.src.JS + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.JS));
});

gulp.task('moveStyle', ['moveScript'], function() {
  return gulp
    .src(paths.src.CSS + '*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.build.CSS));
});

gulp.task('movePages', ['moveStyle'], function() {
  return gulp.src(paths.src.pages + '**/*').pipe(gulp.dest(paths.build.pages));
});

gulp.task('delPublic', ['movePages'], function() {
  return del([paths.build.pages + 'public']);
});

gulp.task('moveImages', ['delPublic'], function() {
  return gulp
    .src(paths.src.images + '**/*')
    .pipe(gulp.dest(paths.build.images));
});

gulp.task('build', ['moveImages']);
