# EmailObfuscator

Lib for obfuscate email on server and unobfuscate on client.

## Installation

```
npm i -S @alreadyexisted/email-obfuscator
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
import { obfuscateEmail } from '@alreadyexisted/email-obfuscator'

...
res.send(obfuscateEmail(html))
...
```

```javascript
// client
import { unobfuscateEmail } from '@alreadyexisted/email-obfuscator'

window.addEventListener('load', () => {
  unobfuscateEmail()
})
```
