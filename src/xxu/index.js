export class Xxu {
	static #VERSION = 'XXU server v.0.4.0';
	
	static #defaultHandler = ({ method, headers, body, path, params }) => {
		return `xxu: ${method}\nxxu: ${path}`;
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
		id: `${Xxu.#VERSION} #${new Date().getMilliseconds()}`,
		fetch: async ({method, url, headers, body}) => {
			const req = {};  //collecting request data for handler

			req.method = method;
			req.headers = headers;
			switch (method) {
				case 'POST':
				case 'DELETE':
				case 'PUT':
				case 'PATCH':
					req.body = body; //readable stream
					break;
				default:
					req.body = null;
			}

			const pathStart = url.indexOf('/', 11);
			const pathEnd = url.indexOf('?', pathStart + 1);
			const path = url.substring(pathStart, pathEnd >>> 0);
			const params = url.substring(pathEnd >>> 0);

			req.path = path;
			req.params = params;

			let resp;

			switch (this.#handler?.constructor.name) {
				case 'Function':
					resp = this.#handler(req);
					break;
				case 'AsyncFunction':
					resp = await this.#handler(req);
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
		console.log(`Server ${this.#server.id} was started.`);
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
		console.log(`Server ${this.#server.id} was stopped.`);
		this.#server.stop(true); //forced to close all connections
	}

	setHandler(handler = Xxu.#defaultHandler) {
		this.#handler = handler;
	}

}
