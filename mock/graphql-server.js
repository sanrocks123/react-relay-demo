const { buildClientSchema } = require('graphql');
const introspectionResult = require('./schema.json');
const { ApolloServer } = require('apollo-server');
const schema = buildClientSchema(introspectionResult.data);
const data = require('./data.js');

const mocks = {
    Company: () => (data.Company)
}

const server = new ApolloServer({
    schema,
    mocks
});

server.listen({ port: 3002 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});