import test from 'ava'

import LimitRange from '../src/limit-range'
const topLeftLimitRange = new LimitRange('top-left')
const topRightLimitRange = new LimitRange('top-right')
const downRightLimitRange = new LimitRange('down-right')
const downLeftLimitRange = new LimitRange('down-left')

test('Started have no `freezeWidth` and `freezeHeight`', assert => {
  assert.is(topLeftLimitRange.freezeHeight, false)
  assert.is(topLeftLimitRange.freezeWidth, false)
})

test('should be limited range on top-left side if selection out', assert => {
  topLeftLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: -20,
      top: -10,
      width: 200,
      height: 200,
    }
  })

  assert.truthy(topLeftLimitRange.freezeHeight)
  assert.truthy(topLeftLimitRange.freezeWidth)
})


test('Started have no `freezeWidth` and `freezeHeight` if reset it.', assert => {
  topLeftLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: -20,
      top: -10,
      width: 200,
      height: 200,
    }
  })
  topLeftLimitRange.reset()
  assert.is(topLeftLimitRange.freezeHeight, false)
  assert.is(topLeftLimitRange.freezeWidth, false)
})


test('should be got new size on `top-left` side if selection out', assert => {
  const newSize = topLeftLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: -20,
      top: -10,
      width: 200,
      height: 200,
    }
  })

  assert.deepEqual(newSize, {
    left: 0,
    top: 0,
    width: 180,
    height: 190,
  })
})

test('should be got new size on `top-right` side if selection out', assert => {
  const newSize = topRightLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: 400,
      top: -100,
      width: 300,
      height: 200,
    }
  })

  assert.deepEqual(newSize, {
    left: 400,
    top: 0,
    width: 200,
    height: 200,
  })
})

test('should be got new size on `down-right` side if selection out', assert => {
  const newSize = downRightLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: 400,
      top: 100,
      width: 300,
      height: 200,
    }
  })

  assert.deepEqual(newSize, {
    left: 400,
    top: 100,
    width: 200,
    height: 100,
  })
})

test('should be got new size on `down-left` side if selection out', assert => {
  const newSize = downLeftLimitRange.getNewSize({
    container: {
      offsetWidth: 600,
      offsetHeight: 200,
    },
    rectangle: {
      left: -50,
      top: 100,
      width: 300,
      height: 200,
    }
  })

  assert.deepEqual(newSize, {
    left: 0,
    top: 100,
    width: 250,
    height: 100,
  })
})
