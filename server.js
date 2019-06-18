const koa = require('koa');
const {ApolloServer } = require('apollo-server-koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const api = require('./api/index.js');
const config = require('./config/index').server;

const app = new koa();
const router = new koaRouter();
const apiPort = config.dev.api.port;

app.use(koaBody());

const gqlServer = new ApolloServer(api);
gqlServer.applyMiddleware({app});


app.listen({port: apiPort}, () =>
    console.log(`listening on localhost:${apiPort}${gqlServer.graphqlPath}`)
);