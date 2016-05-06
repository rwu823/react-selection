import {exec} from 'shelljs'
import glob from 'glob'
import c from 'chalk'

const ver = '2.53'
const dlURL = `http://selenium-release.storage.googleapis.com/${ver}/selenium-server-standalone-${ver}.0.jar`
const dest = `./test/setup/selenium-server-standalone-${ver}.0.jar`

const hasSeleiumServer = glob.sync('test/setup/selenium-server-standalone-*.jar').length

if (!hasSeleiumServer) {
  exec(`curl -L ${dlURL} -o ${dest}`)
  console.log(`download file to: ${c.cyan(dest)}`)
}


