# XXU server

A simple http server with built-in jsx support suitable for backend behind a reverse proxy. Working with [Bun](https://github.com/oven-sh/bun) only.

### Quick start

To import as a module from Github:
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

### Usage

Original request is parsed and transmitted to the handler function in form of an object with specific fields.
```js
import { Xxu } from 'xxu';
const xxu = new Xxu(8008, (req) => {
	req.method; //GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS
	req.headers; //original headers from request
	req.body;  //readable stream if method is POST, PUT, DELETE, PATCH, otherwise null
	req.path; // /path/to/index.html
	req.params; // ?a=1&b=2&c=3

	if (req.body) console.log(await Bun.readableStreamToText(req.body));

	return 'OK';
});
```

### JSX setup

Minified [react](https://github.com/facebook/react/tree/main/packages/react) and [react-dom/server](https://github.com/facebook/react/tree/main/packages/react-dom) are included into the package and allow to render React Server Components.

Settings in `bunfig.toml`:
```bash
jsx = "react-jsx"
jsxImportSource = "xxu"
```

Use JSX markup:
```js
import { renderToReadableStream } from 'xxu/reacc';
await renderToReadableStream(<div>Hello, world!</div>, {
	bootstrapScriptContent: 'alert("Page loaded");'
});
```

### How to install and run

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
check JSX rendering
```bash
bun run jsx
```

To run the package direct from GitHub:
```bash
bun x woxxo/xxu
```
or from npmjs.com
```bash
bun x xxu
```

To run the tests (see `tests` folder):
```bash
bun test
```

Free software by [woxxo](https://github.com/woxxo).
