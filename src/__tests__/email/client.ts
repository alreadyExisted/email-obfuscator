/**
 * @jest-environment jsdom
 */

import { unobfuscateEmail, obfuscateEmail } from '../../../src/services/email'
import { email, emailTemplate } from './utils'

test('should obfuscate binary email on client', () => {
  const obfuscatedHtml = obfuscateEmail(emailTemplate)
  const body = document.body
  body.innerHTML = obfuscatedHtml
  unobfuscateEmail()
  const hasEmail = body.outerHTML.includes(email)
  expect(hasEmail).toBeTruthy()
})

test('should obfuscate base64 email on client', () => {
  const obfuscatedHtml = obfuscateEmail(emailTemplate, { type: 'base64' })
  const body = document.body
  body.innerHTML = obfuscatedHtml
  unobfuscateEmail({ type: 'base64' })
  const hasEmail = body.outerHTML.includes(email)
  expect(hasEmail).toBeTruthy()
})
