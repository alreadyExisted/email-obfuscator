/**
 * @jest-environment node
 */

import { obfuscateEmail } from '../../../src/services/email'
import { email, emailTemplate } from './utils'

test('should obfuscate binary email on server', () => {
  const obfuscatedHtml = obfuscateEmail(emailTemplate)
  const hasEmail = obfuscatedHtml.includes(email)
  expect(hasEmail).toBeFalsy()
})

test('should obfuscate base64 email on server', () => {
  const obfuscatedHtml = obfuscateEmail(emailTemplate, { type: 'base64' })
  const hasEmail = obfuscatedHtml.includes(email)
  expect(hasEmail).toBeFalsy()
})
