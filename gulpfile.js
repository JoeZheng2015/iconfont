var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var clean = require("gulp-clean");
var fs = require("fs");
var template = require("gulp-template");
var fontName = 'iconfont';
var icons = fs.readdirSync('src/icons');
/** 拿到svg文件的名字 */
icons = icons.map(function(icon) {
	return icon.replace(/\.\w+$/, '');
});

gulp.task('clean', function() {
	return gulp.src("./build", {
		read: false
	})
	.pipe(clean());
});
/**
 * 根据svg生成字体图标和对应的css样式
 * @options  {string} fontName 对应font-family的名字
 * @options  {string} path 样式模板的路径
 * @options  {string} targetPath 根据样式模板生成的样式文件的路径（该路径相对于gulp.dest）
 * @options  {string} fontPath 生成字体文件的路径
 * @options  {Boolean} normalize 是否统一图标的高度
 * @options  {number} fontHeight 指定输出字体图标的高度，默认为最高的那个图标
 */
gulp.task('iconfont', ['clean'], function() {
	gulp.src('src/icons/*.svg')
		.pipe(iconfontCss({
			fontName: fontName,
			path: 'src/templates/icons.css',
			targetPath: '../css/icons.css',
			fontPath: '../fonts/'
		}))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['svg', 'ttf', 'eot', 'woff'],
			normalize: true,
			fontHeight: 1000
		}))
		.pipe(gulp.dest('build/fonts/'));
});
/**
 * 生成展示的index.html
 * 方便以后在此页面上搜索已生成的字体图标的类名
 */
gulp.task('template', ['iconfont'],  function() {
	gulp.src('src/index.html')
		.pipe(template({
			icons: icons
		}))
		.pipe(gulp.dest(''));
});

gulp.task('default', ['template']);