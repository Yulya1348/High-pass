const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const gutil = require('gulp-util')
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');


const fonts = () => {
    src('./src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('./dist/fonts/'))
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts/'))
}

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}

const cb = () => {};

let srcFonts = './src/styles/_fonts.scss';
let appFonts = './dist/fonts/';

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);

	fs.writeFile(srcFonts, '', () => {});
	fs.readdir(appFonts, (err, items) => {
		if (items) {
			let c_fontname;
			for (let i = 0; i < items.length; i++) {
				let fontname = items[i].split('.'),
					fontExt;
				fontExt = fontname[1];
				fontname = fontname[0];
				if (c_fontname != fontname) {
					if (fontExt == 'woff' || fontExt == 'woff2') {
						fs.appendFile(srcFonts, `@include font-face("${fontname}", "${fontname}", 400);\r\n`, () => {});
						
					}
				}
				c_fontname = fontname;
			}
		}
	})

	done();
}

const styles = () => {
    return src('src/styles/**/*.scss')
    .pipe(sass.sync().on('error', notify.onError()))
    .pipe(gutil.env.type === 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(concat('main.css'))
        .pipe(autoprefixes({
            cascade: false
        }))
        .pipe(gutil.env.type === 'build' ? cleanCSS({ level: 2}) : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gutil.env.type === 'build' ? htmlMin({
            collapseWhitespace: true
        }) : gutil.noop())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js'
    ])
    .pipe(gutil.env.type === 'dev' ? sourcemaps.init() : gutil.noop())
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('app.js'))
    .pipe(gutil.env.type === 'build' ? uglify().on('error', notify.onError()) : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg'
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch('src/fonts/**.ttf', fonts);
watch('./src/fonts/**.ttf', fontsStyle);



exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.default = series(clean, resources, htmlMinify, fonts, scripts, styles, images, fontsStyle, watchFiles);