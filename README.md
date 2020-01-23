# EmailObfuscator

Lib for obfuscate email on server and unobfuscate on client.

## Installation

```
npm i -S @already-existed/email-obfuscator
```

## Usage

```html
<!-- html -->
<a data-email="true" href="mailto:[email-href]some-email@some.com[/email-href]">
  [email]some-email@some.com[/email]
</a>
```

```javascript
// server
import { obfuscateEmail } from '@already-existed/email-obfuscator'

...
res.send(obfuscateEmail(html))
...
```

```javascript
// client
import { unobfuscateEmail } from '@already-existed/email-obfuscator'

window.addEventListener('load', () => {
  unobfuscateEmail()
})
```

## Options

```typescript

// 'binary' - slow
// 'base64' - fast
type ObfuscateType = 'binary' | 'base64'

interface ObfuscateOptions {
  type?: ObfuscateType // default: 'binary'
}

obfuscateEmail(value: string, opts?: ObfuscateOptions): string
unobfuscateEmail(opts?: ObfuscateOptions): void
```
