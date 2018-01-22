'use strict';
var gulp = require('gulp'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;


var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

/*Веб сервер*/
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Mad-Max"
};
gulp.task('webserver', function () {
    browserSync(config);
});

/*Пути к файлам chinastudies*/
var chinastudies = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/chinastudies.js',
        style: 'src/scss/chinastudies.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};

/*Собираем html*/
gulp.task('html:build', function () {
    gulp.src(chinastudies.src.html)
        .pipe(plugins.rigger())
        .pipe(gulp.dest(chinastudies.build.html))
        .pipe(reload({stream: true}));
});

/*Собираем javascript*/
gulp.task('js:build', function () {
    gulp.src(chinastudies.src.js)
        .pipe(plugins.plumber())
        .pipe(plugins.rigger())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(chinastudies.build.js))
        .pipe(plugins.filesize())
        .on('error', plugins.util.log)
        .pipe(reload({stream: true}));
});
/*Собираем стили*/
gulp.task('style:build', function () {
    gulp.src(chinastudies.src.style)
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(chinastudies.build.css))
        .pipe(plugins.filesize())
        .on('error', plugins.util.log)
        .pipe(reload({stream: true}))
});
/*Собираем картинки*/
gulp.task('image:build', function () {
    gulp.src(chinastudies.src.img)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(chinastudies.build.img))
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
/*Шрифты*/
gulp.task('fonts:build', function() {
    gulp.src(chinastudies.src.fonts)
        .pipe(gulp.dest(chinastudies.build.fonts))
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

/*Одноразовая сборка*/
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'fonts:build'
]);
/*Следим за изменениями*/
gulp.task('watch', function(){
    plugins.watch([chinastudies.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    plugins.watch([chinastudies.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    plugins.watch([chinastudies.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    plugins.watch([chinastudies.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    plugins.watch([chinastudies.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
/*############### chinastudies #################*/


/*Финишь запуск всего*/
gulp.task('default', [
    'build','webserver','watch'
]);


