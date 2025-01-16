import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, ({ path, params }) => {
	return `>${path}-${params}<`;
});

const cases = [
	['/', ''],
	['/', '?'],
	['/path', ''],
	['/path', '?'],
	['/path/', ''],
	['/path/', '?'],
	['/path', '?a=b'],
	['/path/', '?a=b'],
];

test.each(cases)("path %s + %s", async (path, params) => {
	let response = '';
	try {
		response = await (await fetch(`http://127.0.0.1:3091${path}${params}`)).text();
	} catch(e) {}
	//console.log(response);
	expect(response).toEqual(`>${path}-${params}<`);
});

test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});