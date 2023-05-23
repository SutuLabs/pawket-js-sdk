# JS SDK

#### IIEF
Use 
```html
<script src="//cdn.jsdelivr.net/npm/pawket-js-sdk/dist/pawket.iife.js"></script>
```
to inject the IIFE code.

Use 
```javascript
const client = new chia.Pawket(baseUrl);
```
to initialize the client.

#### Module

Install:

```bash
$ yarn add pawket-js-sdk
```
or
```bash
$ npm install pawket-js-sdk
```

CommonJS:

```javascript
const Pawket = require('pawket-js-sdk');
const client = new Pawket({ baseUrl });
```

ES module:

```javascript
import { Pawket } from 'pawket-js-sdk';
const client = new Pawket({ baseUrl });
```

## License

MIT
