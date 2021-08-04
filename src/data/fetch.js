import _ from 'lodash'
class Fetch {
    static async fetchURI(config) {
        let uri = (config.uri || undefined);
        const method = (config.method || undefined);
        const headers = (config.headers || undefined);
        const body = (config.body || undefined);
        const description = (config.description || undefined);

        if (uri) {
            let output;
            console.log(`%c -> Fetching ${uri}`, 'color: #ACACAC; font-style: italic;');
            await fetch(uri, {
                method,
                headers,
                body: (_.isEmpty(body) ? undefined : Fetch.bodyFormatter(headers, body))
            })
                .then(result => {
                    if (!result.ok) throw result
                    if (result.status == window.code.NO_CONTENT) {
                        return undefined;
                    } else if (result.ok) {
                        return Fetch.resultFormatter(headers, result);
                    }
                })
                .then(result => {
                    output = result
                    if (Fetch.checkEmpty(result) == false) {

                        console.groupCollapsed(`%c -> Fetched ${(description || 'data')} with size %c${Fetch.checkSize(result)}`, 'color: #B3EEA7; font-style: italic;', 'color: #E1EA9A; font-style: bold;')
                        console.groupCollapsed('URI');
                        console.log(uri);
                        console.groupEnd()
                        console.groupCollapsed('Config');
                        console.log(config);
                        console.groupEnd()
                        console.groupCollapsed('Result');
                        console.log(result);
                        console.groupEnd()
                        console.groupCollapsed('Trace');
                        console.trace()
                        console.groupEnd()
                        console.groupEnd()
                    } else {
                        console.groupCollapsed(`%c -> Fetched ${(description || 'data')} but response empty`, 'color: #B3EEA7; font-style: italic;')
                        console.groupCollapsed('URI');
                        console.log(uri);
                        console.groupEnd()
                        console.groupCollapsed('Config');
                        console.log(config);
                        console.groupEnd()
                        console.groupCollapsed('Result');
                        console.log(result);
                        console.groupEnd()
                        console.groupCollapsed('Trace');
                        console.trace()
                        console.groupEnd()
                        console.groupEnd()
                    }
                })
                .catch(error => {
                    if (error.status && error.statusText) {
                        // Fetch return result with Error code
                        console.groupCollapsed(`%c -> There a problem with your ${(description || 'data')} fetch operation:`, 'color: #EA9C9A; font-style: italic;')
                        console.log(`URI: ${error.url}`);
                        console.log(`Status: ${error.status} ${error.statusText}`);
                        console.groupCollapsed('URI');
                        console.log(uri);
                        console.groupEnd()
                        console.groupCollapsed('Config');
                        console.log(config);
                        console.groupEnd()
                        console.groupCollapsed('Error');
                        console.log(error);
                        console.groupEnd()
                        console.groupCollapsed('Trace');
                        console.trace()
                        console.groupEnd()
                        console.groupEnd()
                    } else {
                        // Internal Error
                        console.groupCollapsed(`%c -> There a stateless problem with your ${(description || 'data')} fetch operation:`, 'color: #EA9C9A; font-style: italic;')
                        console.log(error);
                        console.groupCollapsed('URI');
                        console.log(uri);
                        console.groupEnd()
                        console.groupCollapsed('Config');
                        console.log(config);
                        console.groupEnd()
                        console.groupCollapsed('Error');
                        console.log(error);
                        console.groupEnd()
                        console.groupCollapsed('Trace');
                        console.trace()
                        console.groupEnd()
                        console.groupEnd()
                    }

                    throw error;
                });
            return output;
        } else {
            console.log();
            console.log("\x1b[91m", 'URI not found in fetch config, fetch stoped.', '\x1b[0m');
            console.log();
            throw new Error('URI not found in fetch config, fetch stoped.');
        }
    }

    static checkEmpty(result) {
        if (result instanceof ArrayBuffer) {
            return result.byteLength <= 0
        } else if (result instanceof Object) {
            return _.isEmpty(result)
        } else {
            return _.isEmpty(result)
        }
    }
    static checkSize(result) {
        if (result instanceof ArrayBuffer) {
            return result.byteLength
        } else if (result instanceof Object) {
            return _.size(result)
        } else {
            return _.size(result)
        }
    }


    static bodyFormatter(headers, body) {
        if (_.isEmpty(headers) != true && _.isEmpty(headers["Content-Type"]) != true) {
            switch (headers["Content-Type"]) {
                case 'application/json':
                    return JSON.stringify(body);
                default:
                    console.log('\x1b[33m', `Header Content-Type not found, send raw body`, "\x1b[0m");
                    return body;
            }
        } else {
            console.log('\x1b[33m', `Header Content-Type not found, send raw body`, "\x1b[0m");
            return body;
        }
    }

    static resultFormatter(headers, result) {
        let contentType = (_.isEmpty(headers["Accept"]) ? result.headers.get('Content-Type') : headers["Accept"]);
        if (!contentType) {
            console.log('\x1b[33m', `Content-Type / Header Accept not found, return raw response`, "\x1b[0m");
            return result;
        }

        switch (contentType.toLowerCase()) {
            case 'application/json':
            case 'application/sparql-results+json':
            case 'application/json; charset=utf-8':
                return result.json();
            case 'text/csv':
            case 'text/csv;charset=utf-8':
                return result.text();
            case 'image/png':
            case 'image/jpge':
                return result.arrayBuffer();
            default:
                console.log('\x1b[33m', `Content-Type ${contentType} not support, return raw response`, "\x1b[0m");
                return result;
        }
    }
}

export default Fetch.fetchURI