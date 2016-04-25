// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();

var source = [
		'app/**/*.js', 
		"!app/vendor/**/*.*"
	];

gulp.task('webserver', function() {
	return gulp
		.src('app')								// root
		.pipe(plug.webserver({
			livereload: true,							// livereload
			directoryListing: true,
			open: "http://localhost:8000/index.html"	// index.html
	}));
});

gulp.task("hint", function() {
	return gulp
		.src(source)
		.pipe(plug.jshint("./.jshintrc"))

		// default reporter
		// .pipe(plug.jshint.reporter("default"));
		// stylish reporter
		.pipe(plug.jshint.reporter("jshint-stylish"));
});


gulp.task('ngAnnotate', function () {
	return gulp
		.src(source)
		
		// ngAnnotate
		.pipe(plug.ngAnnotate({add: true, single_quotes: false}))
		
		// Rename file
		// .pipe(plug.rename(function(path) {
		// 	path.extname = ".annotated.js"
		// }))

		// uglify
		.pipe(plug.uglify({mangle: true}))

		.pipe(gulp.dest('./build'));
});

gulp.task("watch", function() {
	return gulp
		.watch(source, ["hint"])
		.on("change", function(event) {
			console.log("*** File " + event.path + " was " + event.type + ", running tasks...");
		});
});

// The default task is 'webserver'
gulp.task("default", ["webserver"]);

/*  
	if you don't use the default name if gulpfile.js,
	run gulp like this:
	gulp --gulpfile youFileName taskname
*/