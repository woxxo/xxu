import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, () => {
	return Bun.file('./public_html/bun.jpg');
});

test("response file blob", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(await response.blob()).toMatchSnapshot();
});

test("response file bytes", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(await response.bytes()).toMatchSnapshot();
});


test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
