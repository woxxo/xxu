type ReactNode = any;

export interface RenderToReadableStreamOptions {
	identifierPrefix?: string;
	namespaceURI?: string;
	nonce?: string;
	bootstrapScriptContent?: string;
	bootstrapScripts?: string[];
	bootstrapModules?: string[];
	progressiveChunkSize?: number;
	signal?: AbortSignal;
	onError?: (error: unknown, errorInfo: unknown) => string | void;
}

export interface ReactDOMServerReadableStream extends ReadableStream {
	allReady: Promise<void>;
}

export function renderToReadableStream(
	children: ReactNode,
	options?: RenderToReadableStreamOptions,
): Promise<ReactDOMServerReadableStream>;

