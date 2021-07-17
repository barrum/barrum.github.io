const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const del = require('del');
const less = require('gulp-less');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const img64 = require('gulp-img64');
const browserSync = require('browser-sync').create();


// =============================================================================
// УДАЛЯЕТ ПАПКУ BUILD
// =============================================================================
function clean() {
  return del(['build']);
}

// =============================================================================
// HTML таск (gulp-file-include)
// =============================================================================
function html() {
  return src('_src/html/index.html')
    .pipe(fileinclude({
      prefix: '<!-- @@',
      suffix: ' -->',
      basepath: '_src/html/inc'
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

// =============================================================================
// СТИЛИ
// =============================================================================
function styles() {
  return src('_src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 5 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}

// =============================================================================
// КОПИРУЕТ ФАЙЛЫ И ПАПКИ ИЗ SRC В BUILD
// =============================================================================
function copyFiles() {
  return src(['_src/img/**', '_src/fonts/**'], {
      'base': '_src'
    }) // base треб. для коректного переноса файлов и папок (для fonts)
    .pipe(dest('build'));
}

// =============================================================================
// СЛЕДИТ ЗА ИЗМЕНЕНИЯМИ В ФАЙЛАХ И ПАПКАХ И РЕФРЕШИТ БРАУЗЕР
// =============================================================================
function watching() {
  browserSync.init({
    server: {
      baseDir: './build' // сервер запускается в этой директории
    },
    // browser: ["chrome"]
  });
  watch(['_src/less/**/*.less', /*'!_src/less/components/**'*/], styles); // следит за стилями
  watch('_src/html/**/*.html', html); // следит за html
  watch(['_src/img/**', '_src/fonts/**'], copyFiles); // следит за файлами
  watch('build/*.html').on('change', browserSync.reload); // перегружает браузер, если файлы html в build изменились
}

// =============================================================================
// IMG -> BASE64
// =============================================================================
function base64() {
  return src('build/index.html')
    .pipe(img64())
    .pipe(dest('build/base64'));
}


// =============================================================================
// ЗАПУСК ТАСКОВ
// =============================================================================
exports.clean = clean;
exports.base64 = base64;
exports.default = series(clean, parallel(html, styles, copyFiles), watching);
