/**
 * @jest-environment node
 */

import { obfuscator } from '../../obfuscator'
import { isBrowser } from '../../utils'

test('should obfuscate base64 on server', () => {
  expect(isBrowser).toBeFalsy()

  const name = 'John'

  const encodedName = obfuscator.encode(name, 'base64')
  expect(name).not.toBe(encodedName)

  const decodedName = obfuscator.decode(encodedName, 'base64')
  expect(decodedName).toBe(name)
})
