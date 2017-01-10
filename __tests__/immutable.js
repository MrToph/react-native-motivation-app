import Immutable from 'seamless-immutable'

describe('seamless-immutable deep-merge behavior check', () => {
  const test = Immutable({
    a: {
      b: {
        c: 1,
      },
      a1b: 3,  // will die as second+ level children just die
    },
    a2: { // will survive as first level children get merged
      b2: 5,
    },
  })

  const mergedNoDeep = test.merge({
    a: {
      b: {
        d: 1337,
      },
    },
  })

  const mergedDeep = test.merge({
    a: {
      b: {
        d: 1337,
      },
    },
  },
  { deep: true })

  it('immediate untouched children are the same objects', () => {
    expect(mergedDeep.a2).toBe(test.a2)
    expect(mergedNoDeep.a2).toBe(test.a2)
  })

  it('untouched grand-children+ are removed in noDeep cloning and the same object in deep cloning', () => {
    expect(mergedDeep.a.a1b).toBe(test.a.a1b)
    expect(mergedNoDeep.a.a1b).toBe(undefined)
  })
})
