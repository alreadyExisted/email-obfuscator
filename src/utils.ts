export const isBrowser = typeof window !== 'undefined'

export const _atob = (value: string) => {
  if (isBrowser) return window.atob(value)

  return Buffer.from(value, 'base64').toString('binary')
}

export const _btoa = (value: string) => {
  if (isBrowser) return window.btoa(value)

  return Buffer.from(value, 'binary').toString('base64')
}
