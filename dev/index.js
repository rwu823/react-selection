import React from 'react'
const { render } = require('react-dom')
import App from './app'

render(<App />, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept()
}
