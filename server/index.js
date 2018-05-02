import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import models from './models';

const SECRET = 'accaslkjksk';
const SECRET2 = 'wjdgksdud123';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

const graphqlEndPoint = '/graphql';

app.use(cors('*'));

// bodyParser is needed just for POST.
app.use(graphqlEndPoint, bodyParser.json(), graphqlExpress({ schema, context: {
    models,
    user: {
        id: 1
    },
    SECRET,
    SECRET2
} }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

models.sequelize.sync().then(x => {
    app.listen(8080);
});