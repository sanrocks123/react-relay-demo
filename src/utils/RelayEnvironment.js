import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchGraphQuery(text, variables, url) {
    console.log(`fetchGraphQuery, url: ${url}, text: ${text}, variables: ${JSON.stringify(variables)}`);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: text,
            variables,
        }),
    });
    return await response.json();
}

const relayEnvironment = (url) => {
    console.log('creating environment from ' + url);
    return new Environment({
        network: Network.create(async (params, variables) => {
            return fetchGraphQuery(params.text, variables, url).then(res => {
                if (res && res.errors) {
                    console.log(JSON.stringify(res.errors[0].message));
                    throw new Error(JSON.stringify(res));
                }
                return res;
            });
        }),
        store: new Store(new RecordSource(), { queryCacheExpirationTime: 1 * 1000 }),
    });
};

export const MockServer = relayEnvironment("http://localhost:3002/graphql");
export const RelayEnvironment = relayEnvironment("http://localhost:1000/trading-bot/graphql");