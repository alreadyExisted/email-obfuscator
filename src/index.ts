class EmailObfuscator {
  encodeEmail(email: string) {
    const key = 214
    let encodedString = key.toString(16)

    Array.from(email).forEach(item => (encodedString += (item.charCodeAt(0) ^ key).toString(16)))

    return encodedString
  }

  decodeEmail(encodedString: string) {
    let email = ''
    const key = parseInt(encodedString.substr(0, 2), 16)

    for (let n = 2; encodedString.length - n; n += 2) {
      const code = parseInt(encodedString.substr(n, 2), 16) ^ key
      email += String.fromCharCode(code)
    }

    return email
  }
}

const emailObfuscator = new EmailObfuscator()

const EMAIL_ATTR = 'data-email'
const EMAIL_RESULT_ATTR = 'data-email-result'
const EMAIL_REG_EXP = /\[email\](.*?)\[\/email\]/gim
const EMAIL_HREF_REG_EXP = /\[email-href\](.*?)\[\/email-href\]/gim

export const obfuscateEmail = (html: string) =>
  html
    .replace(EMAIL_HREF_REG_EXP, match => {
      const value = emailObfuscator.encodeEmail(match.slice(12, match.length - 13))
      return `[email-href]${value}[/email-href]`
    })
    .replace(EMAIL_REG_EXP, match => {
      const value = emailObfuscator.encodeEmail(match.slice(7, match.length - 8))
      return `<span ${EMAIL_RESULT_ATTR}="${value}"></span>`
    })

export const unobfuscateEmail = () => {
  const emails = Array.from(document.querySelectorAll(`[${EMAIL_ATTR}]`))

  emails.forEach(item => {
    item.removeAttribute(EMAIL_ATTR)

    if (item.tagName === 'A') {
      let href = item.getAttribute('href') || ''

      href = href.replace(EMAIL_HREF_REG_EXP, match => {
        return emailObfuscator.decodeEmail(match.slice(12, match.length - 13))
      })

      item.setAttribute('href', href)
    }

    const emailNode = item.querySelector(`span[${EMAIL_RESULT_ATTR}]`)

    if (!emailNode) return

    const email = emailObfuscator.decodeEmail(emailNode.getAttribute(EMAIL_RESULT_ATTR) || '')

    item.replaceChild(document.createTextNode(email), emailNode)
  })
}
