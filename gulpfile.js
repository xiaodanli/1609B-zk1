/*
 * @Author: 李晓丹 
 * @Date: 2018-12-01 08:11:42 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-12-01 09:10:11
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var server = require('gulp-webserver');

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
    return gulp.src('src')
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

                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
            }
        }
    }))
})

//开发环境
gulp.task('dev',gulp.series('devScss','devServer','watch'))


