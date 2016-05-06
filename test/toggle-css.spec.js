import test from 'ava'
import jsdom from 'jsdom'
import toggleClass from '../src/toggle-class'

const setEnv = ()=> {
  return new Promise((resolve, reject) => {
    jsdom.env(
      `<div id="el"></div>`, (err, window) => {
        const {$, document} = window
        const el = document.querySelector('#el')

        resolve(el)
      }
    )
  })
}

let el
test.beforeEach(async ()=> {
  el = await setEnv()
})


test('#Toggle class with class name', assert => {
  toggleClass(el, 'abc')
  assert.is(el.classList.contains('abc'), true)

  toggleClass(el, 'bcd')
  assert.is(el.classList.contains('bcd'), true)
})

test('#Toggle class with condition', assert => {
  toggleClass(el, true, 'abc')
  assert.is(el.classList.contains('abc'), true)

  toggleClass(el, false, 'abc')
  assert.is(el.classList.contains('abc'), false)
})

