import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, () => {
	return new Response(`I'm a teapot`, {
		status: 418,
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Set-Cookie': `teapot=true; SameSite=Lax; path=/`,
		},
	});
});

test("response response", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(await response.text()).toEqual(`I'm a teapot`);
	expect(response.status).toEqual(418);
	expect(response.headers.getSetCookie()).toEqual([ `teapot=true; SameSite=Lax; path=/` ]);
});


test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
