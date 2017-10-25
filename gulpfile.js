const gulp = require('gulp');
const util = require('util');
const pump = util.promisify(require('pump'));
const { sync: del } = require('del');
const replace = require('gulp-replace');
const commitHash = require('./scripts/commit-hash');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const { prepend } = require('gulp-insert');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const { createInterface } = require('readline');
const { createReadStream } = require('fs');

const paths = {
  html: 'src/**/*.html',
  css: 'src/**/css/*.css',
  widget: 'src/widget.js',
  scripts: 'src/**/js/*.js',
  images: 'src/**/images/*.{gif,jpg,jpeg,png,svg}'
};

let licenseComment;

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('license', () => {
  licenseComment = `/**\n * @license\n`;

  return new Promise((resolve, reject) => {
    createInterface({ input: createReadStream('LICENSE') })
      .on('line', line => {
        licenseComment += ` * ${line}\n`;
      })
      .on('close', () => {
        licenseComment += ` */\n`;
        resolve(licenseComment);
      });
  });
});

gulp.task('html', async () => {
  return pump([
    gulp.src(paths.html),
    // Set release from base branch instead of generated output
    replace(/\{\{\s*site.github.build_revision\s*\}\}/, await commitHash()),
    htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true
    }),
    gulp.dest('dist')
  ]);
});

gulp.task('css', () => {
  return pump([
    gulp.src(paths.css),
    sourcemaps.init(),
    postcss([
      autoprefixer,
      flexbugs,
      cssnano
    ]),
    sourcemaps.write('.'),
    gulp.dest('dist')
  ]);
});

gulp.task('widget', ['license'], () => {
  return pump([
    gulp.src(paths.widget),
    sourcemaps.init(),
    uglify(),
    prepend(licenseComment),
    sourcemaps.write('.'),
    gulp.dest('dist')
  ]);
});

gulp.task('scripts', ['license'], () => {
  return pump([
    gulp.src(paths.scripts),
    sourcemaps.init(),
    uglify(),
    concat('main.js'),
    uglify(),
    prepend(licenseComment),
    sourcemaps.write('.'),
    gulp.dest('dist/iframe/js')
  ]);
});

gulp.task('images', () => {
  return pump([
    gulp.src(paths.images),
    imagemin(),
    gulp.dest('dist')
  ]);
});

gulp.task('copy', () => {
  return pump([
    gulp.src([
      'CNAME'
    ]),
    gulp.dest('dist')
  ]);
});

gulp.task('watch', ['default'], () => {
  gulp.watch(paths.demos, ['demos']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', [
  'clean',
  'html',
  'css',
  'widget',
  'scripts',
  'images',
  'copy'
]);
