export class Xxu {
	static #VERSION = 'XXU server v.0.0.5';
	static #userHandler = (method, path, headers) => {
		return `xxu: ${new Date().toTimeString()}\nxxu: ${method} ${path}\n${JSON.stringify(headers)}`;
	};

	#server;

	constructor(port = 3050, handler = Xxu.#userHandler) {
		this.#server = Bun.serve({
			port: port,
			hostname: '127.0.0.1',
			development: false,
			async fetch({method, url, headers}) {
				const pathStart = url.indexOf('/', 11);
				const pathEnd = url.indexOf('?', pathStart + 1);
				const path = pathEnd === -1 ? url.substring(pathStart) : url.substring(pathStart, pathEnd);

				return new Response(handler(method, path, headers), {
					status: 200,
					headers: { 'Content-Type': 'text/html; charset=utf-8' },
				});
			},
		})
	}

	get version() {
		return Xxu.#VERSION;
	}
}