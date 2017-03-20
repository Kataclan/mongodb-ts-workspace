var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require('merge2'); 

var paths = {
    in: {
        debug : './dist/*.js',
    },
    out : {        
        folder : "dist/",
        debug: "bin/debug/",
        release: "bin/release/",
        jsFileName: "index.js",
    }
};

gulp.task("build-debug", function () {

    var prj = tsProject.src()
        .pipe(tsProject());
    
    return merge([
        prj.dts.pipe(gulp.dest(paths.out.debug)),
        prj.js.pipe(gulp.dest(paths.out.debug))
    ]);
});

