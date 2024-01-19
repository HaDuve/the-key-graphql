import {
  capitalizeEachWord,
  splitNameFromMail,
  isValidString,
} from '../string.ts'

it('renders scroll view without crashing', () => {
  expect(capitalizeEachWord('hello world')).toEqual('Hello World')
  expect(splitNameFromMail('johndoe@gmail.com')).toEqual('johndoe')
  expect(isValidString('')).toEqual(false)
  expect(isValidString('hello')).toEqual(true)
})
