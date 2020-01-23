import { _atob, _btoa } from './utils'

export type ObfuscateType = 'binary' | 'base64'

export interface ObfuscateOptions {
  type: ObfuscateType
}

export const DEFAULT_OBFUSCATE_OPTIONS: ObfuscateOptions = {
  type: 'binary'
}

class Obfuscator {
  encode(value: string, type: ObfuscateType) {
    switch (type) {
      case 'base64':
        return this.base64Encode(value)
      default:
        return this.binaryEncode(value)
    }
  }

  decode(encodedString: string, type: ObfuscateType) {
    switch (type) {
      case 'base64':
        return this.base64Decode(encodedString)
      default:
        return this.binaryDecode(encodedString)
    }
  }

  private binaryEncode(value: string) {
    const key = 214
    let encodedValue = key.toString(16)

    Array.from(value).forEach(item => (encodedValue += (item.charCodeAt(0) ^ key).toString(16)))

    return encodedValue
  }

  private binaryDecode(encodedValue: string) {
    let value = ''
    const key = parseInt(encodedValue.substr(0, 2), 16)

    for (let n = 2; encodedValue.length - n; n += 2) {
      const code = parseInt(encodedValue.substr(n, 2), 16) ^ key
      value += String.fromCharCode(code)
    }

    return value
  }

  private base64Encode(value: string) {
    return _btoa(value)
  }

  private base64Decode(encodedValue: string) {
    return _atob(encodedValue)
  }
}

export const obfuscator = new Obfuscator()
