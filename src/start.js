import { Xxu } from './xxu';

// const xxu = new Xxu(8811);
// const xxu = new Xxu(8811, () => 'Hello, XXU!');

const xxu = new Xxu(8811, (m, p, h) => {
	return `
	<!DOCTYPE html>
	<html>
	<body>
	<h2>from START:</h2>
	${m} <br> ${p} <br> ${JSON.stringify(h)}
	</body>
	</html>`;
});



console.log(`Hello from START! Using server "${xxu.version}"`);
