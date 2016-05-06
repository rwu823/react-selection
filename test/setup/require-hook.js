import Module from 'module'
import path from 'path'

const _require = Module.prototype.require
const requireHook = function(context, modulePath) {
  return _require.call(context, modulePath)
}


Module.prototype.require = function(modulePath) {
  const ext = path.extname(modulePath)
  const {filename} = this
  if (ext !== '.styl') {
    return requireHook(this, modulePath)
  }
}

