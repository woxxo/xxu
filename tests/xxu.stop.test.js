import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091, () => 'Test Stop');

test("server properties", () => {
	expect(xxu.version).toMatch(/XXU server v./);
	expect(xxu.port).toEqual(3091);
	expect(xxu.hostname).toEqual('127.0.0.1');
});

test("server running snap", async () => {
	let response = '';
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toMatchSnapshot();
});

test("server stopped", async () => {
	let response = 'stopped!';
	xxu.stop();
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});