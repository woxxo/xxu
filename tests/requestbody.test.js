import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, async ({ path, body }) => {
	let data = 'No data!';
	let parser;
	switch (path) {
		case '/text':
			parser = Bun.readableStreamToText;
			break;
		case '/json':
			parser = Bun.readableStreamToJSON;
			break;
		default:
			parser = null;
	}

	if (body && parser) data = await parser(body);

	return data?.data?.hello || data;
});

test("body text", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/text", {
			method: 'POST',
			body: `{"data":{"hello":"world"},"array":[1,2,3,4,{"key":"value"}]}`,
		});
	} catch(e) {}
	expect(await response.text()).toMatchSnapshot();
});

test("body json", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/json", {
			method: 'POST',
			body: `{"data":{"hello":"world"},"array":[1,2,3,4,{"key":"value"}]}`,
		});
	} catch(e) {}
	expect(await response.text()).toEqual('world');
});

test("body nodata", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/nodata", {
			method: 'POST',
			body: `{"data":{"hello":"world"},"array":[1,2,3,4,{"key":"value"}]}`,
		});
	} catch(e) {}
	expect(await response.text()).toEqual('No data!');
});


test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
