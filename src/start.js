import { Xxu } from './xxu';

// const xxu = new Xxu(8811);
// const xxu = new Xxu(8811, () => 'Hello, XXU!');

//await Bun.$`pwd`;

const xxu = new Xxu(8811, (method, path, headers) => {
	switch (path) {
		case '/teapot':
			return new Response(`I'm a teapot`, {
				status: 418,
				headers: {
					'Content-Type': 'text/html; charset=utf-8',
					'Set-Cookie': `teapot=false; SameSite=Lax; path=/`,
				},
			});
			//break;
		case '/picture':
			return Bun.file('./public_html/bun.jpg');
			//break;
		default:	
			return `
				<!DOCTYPE html>
				<html>
				<body>
				<h2>from START:</h2>
				${method}<br />${path}<br />${JSON.stringify(headers)}<br /><img src="/picture" alt="bun" />
				</body>
				</html>`;
	}
});


console.log(`Hello from START! Running "${xxu.version}" on ${xxu.hostname}:${xxu.port}`);
