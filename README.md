# XXU

A simple http server suitable for backend behind a reverse proxy. Working with Bun only.

To import as a module:
```bash
bun add woxxo/xxu
```
```js
import { Xxu } from 'xxu';
const xxu = new Xxu(8008, () => 'Hello, XXU!');
console.log(xxu.version);
```

To install from repo into the new folder:
```bash
bun create woxxo/xxu
```

To run the installed package:
```bash
cd xxu
bun run start
```

To run the package direct from GitHub:
```bash
bun x woxxo/xxu
```

Free software by [woxxo](https://github.com/woxxo).
