import { expect, test } from "bun:test";
import { Xxu } from 'xxu';

const xxu = new Xxu(3091);

test("function snap", async () => {
	let response = '';
	xxu.setHandler(() => 'Function');
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toMatchSnapshot();
});

test("async function snap", async () => {
	let response = '';
	xxu.setHandler(async () => 'Async Function');
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toMatchSnapshot();
});

test("not a function snap", async () => {
	let response = '';
	xxu.setHandler('I am not a Function');
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toMatchSnapshot();
});

test("server stopped snap", async () => {
	let response = 'stopped!';
	try {
		response = await fetch("http://127.0.0.1:3091");
	} catch(e) {}
	expect(response).toEqual('stopped!');
});
