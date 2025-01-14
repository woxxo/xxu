# XXU

A simple http server suitable for backend behind a reverse proxy. Working with [Bun](https://github.com/oven-sh/bun) only.

To import as a module:
```bash
bun add woxxo/xxu
```
```js
import { Xxu } from 'xxu';
const xxu = new Xxu(8008, () => 'Hello, XXU!');
console.log(xxu.version);
```
Return the response in form of a string, a readable stream, a prepared Response() object or a file from handler function:
```js
//file
return Bun.file('./public_html/bun.jpg');

//string
return `<!DOCTYPE html><html><body>${method} ${path}</body></html>`;

//readable stream
return await renderToReadableStream(<App />);

//Response
return new Response(`I'm a teapot`, { status: 418 });
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
or just
```bash
bun start
```


To run the package direct from GitHub:
```bash
bun x woxxo/xxu
```
or from npmjs.com
```bash
bun x xxu
```



Free software by [woxxo](https://github.com/woxxo).
