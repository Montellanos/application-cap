var gulp = require('gulp'),
    shell = require('gulp-shell'),
    sequence = require('run-sequence');

gulp.task('default', function() {
    sequence(
        'build',
        'clean',
        'copy',
        'move',
        'deploy',
        function(error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
        });
});

gulp.task('build', shell.task([
    'ng build --prod --aot --output-hashing = none'
]));

gulp.task('clean', shell.task([
    'cd deploy/public/ && rm -r *'
]));

gulp.task('move', shell.task([
    'cp -r dist/* deploy/public/'
]));


gulp.task('copy', shell.task([
    'cp src/manifest.json dist/ && cp src/sw.js dist/'
]));


gulp.task('deploy', shell.task([
    'cd deploy/ && firebase deploy'
]));