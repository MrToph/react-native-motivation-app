jest.mock('NetInfo', () => ({
  fetch: () => new Promise(res => res()),
}))

jest.mock('AsyncStorage', () => ({
  getItem: jest.fn().mockReturnValue(
    new Promise((resolve, reject) => {
      resolve(JSON.stringify({}))
    }),
  ),
  setItem: jest.fn(),
}))
