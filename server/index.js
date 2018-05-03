import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import jwt from 'jsonwebtoken';

import { refreshTokens } from "./auth";

import models from './models';

const SECRET = 'accaslkjksk';
const SECRET2 = 'wjdgksdud123';

const port = process.env.SLACK_SERVER_PORT || 8080;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

const graphqlEndPoint = '/graphql';

app.use(cors('*'));

const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if(token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
        } catch(err) {
            const refreshToken = req.headers['x-refreshx-token'];
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET);
            if(newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
}

app.use(addUser);

// bodyParser is needed just for POST.
app.use(graphqlEndPoint, bodyParser.json(), graphqlExpress(req=> ({ schema, context: {
    models,
    user: req.user,
    SECRET,
    SECRET2
} })));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndPoint }));

models.sequelize.sync().then(x => {
    app.listen(port, () => {
        console.log('server is listening on port', port);
    });
});