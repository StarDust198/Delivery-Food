"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";
// const dist = "D:/OpenServer/domains/Delivery/";

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
});

gulp.task("copy-css", () => {
    return gulp.src("./src/css/**/*.*")
                .pipe(gulp.dest(dist + "/css"))
                .on("end", browsersync.reload);
});

gulp.task("copy-db", () => {
  return gulp.src("./src/db/**/*.*")
              .pipe(gulp.dest(dist + "/db"))
              .on("end", browsersync.reload);
});

gulp.task("copy-img", () => {
  return gulp.src("./src/img/**/*.*")
              .pipe(gulp.dest(dist + "/img"))
              .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		server: dist,
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/css/**/*.*", gulp.parallel("copy-css"));
    gulp.watch("./src/db/**/*.*", gulp.parallel("copy-db"));
    gulp.watch("./src/img/**/*.*", gulp.parallel("copy-img"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-css", "copy-db", "copy-img", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));