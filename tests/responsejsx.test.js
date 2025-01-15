import { expect, test } from "bun:test";
import { Xxu } from 'xxu';
import { renderToReadableStream } from 'xxu/reacc';

const xxu = new Xxu(3091, async (method, path) => {
	switch(path) {
		case '/simple':
			return await renderToReadableStream(<div>Hello, world!</div>);
		case '/full':
			return await renderToReadableStream(
				<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="description" content="Default description" />
					<title>Default</title>
					<style>{ /* css */ `body {font-family: sans-serif; line-height: 1.5;}`}</style>
				</head>
				<body>
					{ [1, 2, 3, 4, 5].map(_ => <p className="myclass" key={_} style={{ padding: `${_}px` }}>N{_}N</p>) }
				</body>
				</html>, {
				bootstrapScriptContent: 'alert(1);',
				bootstrapScripts: ['/main1.js', '/main2.js', ],
			});
		default:
			return 'OK';
	}
});

test("response simple", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/simple");
	} catch(e) {}
	expect(await response.text()).toEqual(`<div>Hello, world!</div>`);
});

test("response full", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/full");
	} catch(e) {}
	expect(await response.text()).toMatchSnapshot();
});

test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
