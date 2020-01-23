import { obfuscator } from '../../obfuscator'

test('should obfuscate binary', () => {
  const name = 'Ivan'

  const encodedName = obfuscator.encode(name, 'binary')
  expect(name).not.toBe(encodedName)

  const decodedName = obfuscator.decode(encodedName, 'binary')
  expect(decodedName).toBe(name)
})
