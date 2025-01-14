import { Xxu } from 'xxu';
import { renderToReadableStream } from 'xxu/reacc';

const xxu = new Xxu(8811, async (method, path, headers) => {
	return await renderToReadableStream(
		<html lang="en">
		<head>
			<meta charset="utf-8" />
			<meta name="description" content="Default description" />
			<title>Default</title>
			<style>{ /* css */ `body {font-family: sans-serif; line-height: 1.5;}`}</style>
		</head>
		<body>
			{ new Array(10).fill(0).map(_ => <p key={_} style={{ padding: "5px" }}>{_}</p>) }
		</body>
		</html>, {
		bootstrapScriptContent: 'alert(1);',
		bootstrapScripts: ['/main1.js', '/main2.js', ],
	});
});


console.log(`Hello from START-JSX! Running "${xxu.version}" on ${xxu.hostname}:${xxu.port}`);
