export class Xxu {
	static #VERSION = 'XXU server v.0.0.7';
	
	static #defaultHandler = (method, path, headers) => {
		return `xxu: ${new Date().toTimeString()}\nxxu: ${method} ${path}\n${JSON.stringify(headers)}`;
	}

	static #isBunFile = (file) => {
		return file instanceof Blob && 'name' in file && file.name.length > 0;
	};

	#server;
	#port;
	#hostname;
	#handler;

	constructor(port = 3050, handler = Xxu.#defaultHandler) {
		this.#server = Bun.serve({
			port: port,
			hostname: '127.0.0.1',
			development: false,
			async fetch({method, url, headers}) {
				const pathStart = url.indexOf('/', 11);
				const pathEnd = url.indexOf('?', pathStart + 1);
				const path = pathEnd === -1 ? url.substring(pathStart) : url.substring(pathStart, pathEnd);

				const resp = handler(method, path, headers);

				if (Xxu.#isBunFile(resp)) {
					return new Response(resp);  //file
				}

				if (resp?.constructor.name === 'Response') {
					return resp; //response prepared completely by user
				}

				return new Response(resp, {
					status: 200,
					headers: {
						'Content-Type': 'text/html; charset=utf-8',
						//'Set-Cookie': `session${(Math.random() * 9999999 | 0)}=${(Math.random() * 9999999 | 0)}; SameSite=Lax; path=/`,
					 },
				});
			},
		})
	}

	get version() {
		return Xxu.#VERSION;
	}
}