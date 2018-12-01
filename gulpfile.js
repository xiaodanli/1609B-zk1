/*
 * @Author: 李晓丹 
 * @Date: 2018-12-01 08:11:42 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-12-01 09:21:48
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var server = require('gulp-webserver');

var uglify = require('gulp-uglify');

var babel = require('gulp-babel');

var url = require('url');

var fs = require('fs');

var path = require('path');

var swiper = require('./mock/swiper.json');

//编译scss
gulp.task('devScss',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest('./src/css'))
})

//监听
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devScss'))
})

//起服务
gulp.task('devServer',function(){
    return gulp.src('build')
    .pipe(server({
        port:9090,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;
            console.log(pathname);

            if(pathname === '/favicon.ico'){
                res.end('');
                return 
            }

            if(pathname === '/api/swiper'){
                res.end(JSON.stringify({code:1,data:swiper}));
            }else{
                pathname = pathname === '/' ? 'index.html' : pathname;

                res.end(fs.readFileSync(path.join(__dirname,'build',pathname)));
            }
        }
    }))
})

//开发环境
gulp.task('dev',gulp.series('devScss','devServer','watch'))

//线上环境

//css
gulp.task('bCss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./build/css'))
})

//js

gulp.task('bUglify',function(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('bCopyJs',function(){
    return gulp.src('./src/js/libs/*.js')
    .pipe(gulp.dest('./build/js/libs'))
})

gulp.task('bHtml',function(){
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
})

//线上环境
gulp.task('build',gulp.parallel('bCss','bUglify','bCopyJs','bHtml'))


