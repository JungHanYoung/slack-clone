import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from './schema';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.listen(8080);