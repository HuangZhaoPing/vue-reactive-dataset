const path = require('path')

function resolve (...value) {
  return path.resolve(__dirname, '..', ...value)
}

module.exports = {
  resolve
}
