var gulp = require('gulp'),
  svgSprite = require('gulp-svg-sprite');

var config = {
  mode: {
      view: {
          layout: 'vertical'
      }
  },
  shape: {
      spacing: {
          padding: 10
      }
  }
};

gulp.task('default', function () {
    gulp.src('./sparks/*.svg')
      .pipe(svgSprite(config))
      .pipe(gulp.dest('./output'));
});
