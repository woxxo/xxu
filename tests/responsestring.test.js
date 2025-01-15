import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, (method, path, headers, params) => {
	return `<!DOCTYPE html><html><body>${method}<br />${path}<br />${params}<br /></body></html>`;
});

test("response string", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/path/to/file?param1=1");
	} catch(e) {}
	expect(await response.text())
		.toEqual(`<!DOCTYPE html><html><body>GET<br />/path/to/file<br />?param1=1<br /></body></html>`);
});


test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
