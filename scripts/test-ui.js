import exec from './exec'

exec('npm run dev').log()
exec('java -jar test/setup/selenium-server-standalone-2.53.0.jar').log()

setTimeout(()=> {
  exec('./node_modules/.bin/nightwatch').log()
}, 7500)

