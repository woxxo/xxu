#!/usr/bin/env bun

import { Xxu } from './xxu';

const handler1 = (m, path) => {
	if (path === '/set2') {
		xxu.setHandler(handler2);
	}
	if (path === '/set3') {
		xxu.setHandler(null);
	}
	if (path === '/default') {
		xxu.setHandler();
	}
	if (path === '/stop') {
		xxu.stop();
	}

	return 'handler1';
}

const handler2 = async (m, path) => {
	if (path === '/set1') {
		xxu.setHandler(handler1);
	}
	return 'async handler2';
}


const xxu = new Xxu(8181, handler1);

console.log(`Hello from CLI! Running "${xxu.version}" on ${xxu.hostname}:${xxu.port}`);
