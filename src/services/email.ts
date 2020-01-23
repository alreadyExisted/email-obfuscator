import { obfuscator, ObfuscateOptions, DEFAULT_OBFUSCATE_OPTIONS } from '../obfuscator'

const EMAIL_ATTR = 'data-email'
const EMAIL_RESULT_ATTR = 'data-email-result'
const EMAIL_REG_EXP = /\[email\](.*?)\[\/email\]/gim
const EMAIL_HREF_REG_EXP = /\[email-href\](.*?)\[\/email-href\]/gim

export const obfuscateEmail = (html: string, opts: Partial<ObfuscateOptions> = {}) => {
  const _opts = { ...DEFAULT_OBFUSCATE_OPTIONS, ...opts }

  return html
    .replace(EMAIL_HREF_REG_EXP, match => {
      const value = obfuscator.encode(match.slice(12, match.length - 13), _opts.type)
      return `[email-href]${value}[/email-href]`
    })
    .replace(EMAIL_REG_EXP, match => {
      const value = obfuscator.encode(match.slice(7, match.length - 8), _opts.type)
      return `<span ${EMAIL_RESULT_ATTR}="${value}"></span>`
    })
}

export const unobfuscateEmail = (opts: Partial<ObfuscateOptions> = {}) => {
  const _opts = { ...DEFAULT_OBFUSCATE_OPTIONS, ...opts }

  const emails = Array.from(document.querySelectorAll(`[${EMAIL_ATTR}]`))

  emails.forEach(item => {
    item.removeAttribute(EMAIL_ATTR)

    if (item.tagName === 'A') {
      let href = item.getAttribute('href') || ''

      href = href.replace(EMAIL_HREF_REG_EXP, match => {
        return obfuscator.decode(match.slice(12, match.length - 13), _opts.type)
      })

      item.setAttribute('href', href)
    }

    const emailNode = item.querySelector(`span[${EMAIL_RESULT_ATTR}]`)

    if (!emailNode) return

    const email = obfuscator.decode(emailNode.getAttribute(EMAIL_RESULT_ATTR) || '', _opts.type)

    item.replaceChild(document.createTextNode(email), emailNode)
  })
}
