#!/usr/bin/env bun

import { Xxu } from 'xxu';
import { renderToReadableStream } from 'xxu/reacc';

const Layout = ({ title, children }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<title>{title}</title>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}

const handler1 = async ({ path }) => {
	if (path === '/set2') {
		xxu.setHandler(handler2);
	}
	if (path === '/setnull') {
		xxu.setHandler(null);
	}
	if (path === '/default') {
		xxu.setHandler();
	}
	if (path === '/stop') {
		xxu.stop();
	}

	return await renderToReadableStream(
		<Layout title="handler1">
			<p><a href="/set2">Set handler2</a></p>
			<p><a href="/setnull">Set null handler (not exists!)</a></p>
			<p><a href="/default">Set default handler (no way back)</a></p>
			<p><a href="/stop">Stop server</a></p>
		</Layout>
	);
}

const handler2 = async ({ path }) => {
	if (path === '/set1') {
		xxu.setHandler(handler1);
	}
	return await renderToReadableStream(
		<Layout title="handler2">
			<p><a href="/set1">Set handler1</a></p>
		</Layout>
	);
}


const xxu = new Xxu(8181, handler1);

console.log(`Hello from CLI! Running "${xxu.version}" on ${xxu.hostname}:${xxu.port}`);
