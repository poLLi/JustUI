const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");
const del = require('del');

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/ts/**/*.ts',
        dest: 'dist/js/'
    }
};

function wipe() {
    return del(['dist']);
}

function buildSass() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest));
}

function buildTs() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    build();
    gulp.watch(paths.styles.src, buildSass);
    gulp.watch(paths.scripts.src, buildTs);
}

const build = gulp.series(wipe, gulp.parallel(buildSass, buildTs));

exports.wipe = wipe;
exports.sass = buildSass;
exports.ts = buildTs;
exports.watch = watch;
exports.build = build;

exports.default = build;