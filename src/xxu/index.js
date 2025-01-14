export class Xxu {
	static #VERSION = 'XXU server v.0.2.2';
	
	static #defaultHandler = (method, path, headers) => {
		return `xxu: ${new Date().toTimeString()}\nxxu: ${method} ${path}\n${JSON.stringify(headers)}`;
	}

	static #isBunFile = (file) => {
		return file instanceof Blob && 'name' in file && file.name.length > 0;
	};

	#server;
	#port = 3050;
	#hostname = '127.0.0.1';  //for docker 0.0.0.0
	#handler = Xxu.#defaultHandler;
	#serverSettings = {
		port: this.#port,
		hostname: this.#hostname,
		development: false,
		fetch: async ({method, url, headers}) => {
			const pathStart = url.indexOf('/', 11);
			const pathEnd = url.indexOf('?', pathStart + 1);
			const path = pathEnd === -1 ? url.substring(pathStart) : url.substring(pathStart, pathEnd);

			let resp;

			switch (this.#handler?.constructor.name) {
				case 'Function':
					resp = this.#handler(method, path, headers);
					break;
				case 'AsyncFunction':
					resp = await this.#handler(method, path, headers);
					break;
				default:
					console.log('Handler is not a function!');
					resp = new Response('Wrong handler!', { status: 500 });
					setImmediate(this.stop.bind(this));
			}

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
	};

	constructor(port = this.#port, handler = this.#handler) {
		this.#serverSettings.port = port;
		this.#handler = handler;
		this.#server = Bun.serve(this.#serverSettings);
	}

	get version() {
		return Xxu.#VERSION;
	}

	get port() {
		return this.#server.port;
	}

	get hostname() {
		return this.#server.hostname;
	}

	stop() {
		console.log('Server exiting...');
		this.#server.stop();
	}

	setHandler(handler = Xxu.#defaultHandler) {
		this.#handler = handler;
	}

}
