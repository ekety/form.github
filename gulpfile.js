let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function() {
   del.sync('dist'); 
});


gulp.task('scss', async function() {
    return gulp.src([
        'src/common/mixins/**/*.scss',
        'src/common/**/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))

});


gulp.task('html', function() {
    return gulp.src('src/*.html')
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('css', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/animate.css/animate.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('src/common/mixins'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('script', function() {
    return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('js', function() {
    return gulp.src([
        'node_modules/wow.js/dist/wow.js',
        
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/" 
        }
    });
});

gulp.task('export', async function() {
    let buildHtml = gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist')) 
    
    let buildCss = gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'))
    
     let buildJs = gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
     
     let buildFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
     
      let buildImg = gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('dist/images'))
    
    
}); 


gulp.task('build', gulp.series('clean', 'export'));

gulp.task('watch', function() {
    gulp.watch('src/common/**/*.scss', gulp.parallel('scss'));
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('css','scss', 'js', 'html', 'browser-sync', 'watch')); 