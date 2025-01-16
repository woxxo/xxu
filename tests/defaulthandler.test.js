import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091);  //default handler

test("default handler get", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/get/path");
	} catch(e) {}
	expect(await response.text()).toMatchSnapshot();
});

test("default handler delete", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091/delete/path", {
			method: 'DELETE',
		});
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
