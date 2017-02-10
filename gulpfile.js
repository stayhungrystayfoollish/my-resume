var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    //notify的功能主要有两点,显示报错信息和报错后不终止当前gulp任务
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');


//压缩css，添加前缀
gulp.task('styles', function() {
    return gulp.src('app/styles/**/*.css')
    // .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//html压缩
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    };
    gulp.src('app/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

// 图片压缩
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// 清除之前生成的文件
gulp.task('clean', function(cb) {
    del(['dist/styles', 'dist/img'], cb)
});


//监听变化
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('app/styles/**/*.css', ['styles']);
    // Watch .js files
    gulp.watch('app/**/*.html', ['testHtmlmin']);
    // Watch image files
    gulp.watch('app/img/**/*', ['images']);
});

//设置默认任务
// gulp.task('default', ['clean'], function() {
//     gulp.start('styles', 'scripts', 'images');
// });
gulp.task('build', ['styles', 'testHtmlmin', 'images']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});


