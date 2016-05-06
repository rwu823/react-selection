import React, {} from 'react'
const {render} = require('react-dom')
const Selection = require('../src/index.jsx')

class App extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  afterSelect = (selectedTargets)=> {
    const selectText = (selectedTargets).reduce((pv, cv, idx)=> {
      return pv += `${selectedTargets[idx].textContent}\n`
    }, '')

    if (selectText) {
      alert(selectText)
    }
  }

  render() {
    return (
      <div>
        <h3>Basic example</h3>
        <p>1. Try to select below items.
        </p>
        <p>
          2. Try to press <span className="code">ctrl</span>(win) or <span className="code">command</span> (os x) key
        </p>
        <div className="select-box">
          <Selection target=".target" afterSelect={this.afterSelect}>
            <ul>
              <li><span className="target">React</span>
                <ul>
                  <li><span className="target">redux</span></li>
                  <li><span className="target">react-redux</span></li>
                  <li><span className="target">react-router</span></li>
                  <li><span className="target">redux-thunk</span></li>
                  <li><span className="target">redux-logger</span></li>
                  <li><span className="target">redux-saga</span></li>
                </ul>
              </li>
            </ul>
          </Selection>
        </div>

        <h3>Limiting range example</h3>
        <p>Cannot select outside the box</p>
        <div className="select-box">
          <Selection target=".target" afterSelect={this.afterSelect} isLimit={true}>
              <ul>
                <li><span className="target">Web technology</span>
                  <ul>
                    <li><span className="target">HTML5</span>
                    </li>
                    <li><span className="target">CSS</span>
                      <ul>
                        <li><span className="target">Sass</span></li>
                        <li><span className="target">Less</span></li>
                        <li><span className="target">Stylus</span></li>
                        <li><span className="target">PostCSS</span></li>
                      </ul>
                    </li>
                    <li><span className="target">JavaScript</span>
                      <ul>
                        <li><span className="target">ES 2015</span></li>
                      </ul>
                    </li>
                    <li><span className="target">NodeJS</span></li>
                  </ul>
                </li>
              </ul>
            </Selection>
        </div>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
