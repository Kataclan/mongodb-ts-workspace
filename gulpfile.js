var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var mold = require('mold-source-map');

var paths = {
    in: {
        code: ['src/index.ts'],
        style: "src/style/**/*.*",
        res: "src/res/**/*"
    },
    out: {
        folder: "dist/",
        debug: "dist/debug/",
        release: "dist/release/",
        res: "res/",
        jsFileName: "index.js"
    }
};
//#region [ res ]
gulp.task("res-debug", function() {
    return gulp.src(paths.in.res)
        .pipe(gulp.dest(paths.out.debug + paths.out.res));
});
gulp.task("res-release", function() {
    return gulp.src(paths.in.res, { base: paths.out.release })
        .pipe(gulp.dest(paths.out.release + paths.out.res));
});
//#endregion

//#region [ app ]
gulp.task("clean", function() {
    return gulp.src(paths.out.folder)
        .pipe(clean());
});
gulp.task("debug", ["res-debug"], function() {
    return browserify({
        debug: true,
        entries: paths.in.code
    })
        .exclude("express")
        .exclude("mongodb")
        .exclude("swagger-jsdoc")
        .exclude("swagger-ui-express")
        .exclude("path")
        .exclude("fs")
        .plugin(tsify)
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.debug))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.debug))
        .pipe(size({ title: paths.out.debug + paths.out.jsFileName }));
});
gulp.task("release", ["res-release"], function() {
    return browserify({
        entries: paths.in.code,
    })
        .exclude("express")
        .exclude("mongodb")
        .exclude("swagger-jsdoc")
        .exclude("swagger-ui-express")
        .exclude("path")
        .exclude("fs")
        .plugin(tsify)
        .bundle()
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.out.release))
        .pipe(size({ title: paths.out.release + paths.out.jsFileName }));
});

var watchedBrowserify = watchify(browserify({
    debug: true,
    entries: paths.in.code,
}).plugin(tsify));

function bundle() {
    gutil.log("start building app ...");
    return watchedBrowserify
        .bundle()
        .pipe(mold.transformSourcesRelativeTo(paths.out.debug))
        .pipe(source(paths.out.jsFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out.debug))
        .pipe(size({ title: paths.out.debug + paths.out.jsFileName }));
}
gulp.task("building", ["res-debug"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
//#endregion

