export default {
  lockToPortrait() {},
  addOrientationListener: jest.fn(),
  getOrientation: (cb) => {
    cb(undefined, 'PORTRAIT')
  },
}
