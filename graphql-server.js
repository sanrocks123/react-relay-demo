const { buildClientSchema } = require('graphql');
const introspectionResult = require('./schema.json');
const { ApolloServer } = require('apollo-server');

const schema = buildClientSchema(introspectionResult.data);

const mocks = {

}

const server = new ApolloServer({
    schema,
    mocks: true,
});

server.listen({ port: 3002 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});