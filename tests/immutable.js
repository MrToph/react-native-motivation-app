import Immutable from 'seamless-immutable'

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
const changed = test.merge({
  a: {
    b: {
      d: 1337,
    },
  },
},
{ deep: true })


console.log('test.a2 === changed.a2', test.a2 === changed.a2)
console.log(changed.a.a1b)
console.log(changed.a.a1b === test.a.a1b)
