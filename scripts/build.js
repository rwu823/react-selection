import {rm} from 'shelljs'
import gu from 'gulp'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import cleanCSS from 'gulp-clean-css'
import webpack from 'webpack'
import webpackConf from '../webpack.config'

rm('-rf', 'dist')
webpack(webpackConf, (err, stats)=>{
  console.log(stats.toString({
    colors: true
  }))

  gu.src('dist/*.js')
    .pipe(uglify())
    .pipe(rename((f)=>{
      f.basename += '.min'
    }))
    .pipe(gu.dest('dist'))

  gu.src('dist/*.css')
    .pipe(cleanCSS())
    .pipe(rename((f)=>{
      f.basename += '.min'
    }))
    .pipe(gu.dest('dist'))
})
