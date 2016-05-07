import test from 'ava'
import React from 'react'
import Selection from '../src/index.jsx'
import {shallow, mount} from 'enzyme'
import jsdom from 'jsdom'
import {renderToString} from 'react-dom/server'

function Target() {
  return (
    <ul>
      <li>React
        <ul>
          <li><span className="target">redux</span></li>
          <li><span className="target">react-redux</span></li>
          <li><span className="target">react-router</span></li>
          <li><span className="target">redux-thunk</span></li>
        </ul>
      </li>
    </ul>
  )
}

function setEnv() {
  return new Promise((resolve, reject) => {
    jsdom.env(`<div id="app">${renderToString(<Target />)}</div>`, (err, window) =>{
      const {$, document} = window

      resolve(document)
    })
  })
}

let compo, app, doc
test.beforeEach(async ()=> {
  doc = await setEnv()
  app = doc.getElementById('app')

  compo = mount( <Selection target=".target" isLimit={true}><Target /></Selection>)
})


test('#Test Selection set state', assert => {
  compo.setState({
      rectangleStyle: {
        left: 20,
        top: 20,
        width: 200,
        height: 300,
      }
    })
  assert.deepEqual({ left: 20, top: 20, width: 200, height: 300 },
    compo.find('.react-selection-rectangle').props().style
  )
})

test('should get target length', assert => {
  const instance = compo.instance()
  instance.ctrlKey = true
  compo.simulate('mousedown')
  assert.is(instance.targets.length, 4)
})

test('instance mousedown', assert => {
  compo.simulate('mousedown')
})

test('mousemove turn top-left', assert => {
  const instance = compo.instance()
  instance.targets = []
  instance._box = {
    offsetLeft: 10,
    offsetTop: 10
  }
  instance.clickX = 200
  instance.clickY = 100

  instance.mousemove({
    pageX: 100,
    pageY: 50
  })

  assert.deepEqual(compo.state().rectangleStyle, {
    left: 90,
    top: 40,
    width: 110,
    height: 60,
    opacity: 1,
  })
})

test('mousemove turn top-right', assert => {
  const instance = compo.instance()
  instance.targets = []
  instance._box = {
    offsetLeft: 10,
    offsetTop: 10
  }
  instance.clickX = 200
  instance.clickY = 100

  instance.mousemove({
    pageX: 250,
    pageY: 50
  })

  assert.deepEqual(compo.state().rectangleStyle, {
    left: 200,
    top: 40,
    width: 40,
    height: 60,
    opacity: 1,
  })
})

test('mousemove turn down-right', assert => {
  const instance = compo.instance()
  instance.targets = []
  instance._box = {
    offsetLeft: 10,
    offsetTop: 10
  }
  instance.clickX = 200
  instance.clickY = 100

  instance.mousemove({
    pageX: 250,
    pageY: 150
  })

  assert.deepEqual(compo.state().rectangleStyle, {
    left: 200,
    top: 100,
    width: 40,
    height: 40,
    opacity: 1,
  })
})

test('mousemove turn down-left', assert => {
  const instance = compo.instance()
  instance.targets = []
  instance._box = {
    offsetLeft: 10,
    offsetTop: 10
  }
  instance.clickX = 200
  instance.clickY = 100

  instance.mousemove({
    pageX: 150,
    pageY: 150
  })

  assert.deepEqual(compo.state().rectangleStyle, {
    left: 140,
    top: 100,
    width: 60,
    height: 40,
    opacity: 1,
  })
})

test('mouseup and keyup', assert => {
  const instance = compo.instance()
  instance.ctrlKey = true
  instance.mouseup()
  instance.keyup()
})

test('mousemove with targets for each', assert => {
  const instance = compo.instance()
  instance.targets = Array.from(app.querySelectorAll('.target')).map(t => {
    t.dataset = {
      isDouble: 'true'
    }
    return t
  })

  instance.mousemove({
    pageX: 150,
    pageY: 150
  })
})
