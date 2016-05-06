import {exec} from 'child_process'

class Exec {
  constructor(cmd = '') {
    this.child = exec(cmd)
    this.child.stderr.on('data', (er)=> {
      console.log(er)
    })
  }

  log() {
    this.child.stdout.on('data', (log)=> {
      console.log(log)
    })
    return this
  }
  data(event) {
    this.child.stdout.on('data', event)
    return this
  }

  error(event) {
    this.child.stderr.on('data', event)
    return this
  }

  end(event) {
    return new Promise((resolve, reject) => {
      this.child.on('close', (er)=> {
        if (typeof event === 'function') event(er)
        resolve()
      })
    })
  }
}

module.exports = (cmd)=> {
  return new Exec(cmd)
}
