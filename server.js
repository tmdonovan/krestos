const koa = require('koa');
const {ApolloServer } = require('apollo-server-koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const api = require('./api/index.js');

const app = new koa();
const router = new koaRouter();
const port = 4000;

app.use(koaBody());

const gqlServer = new ApolloServer(api);
gqlServer.applyMiddleware({app});


app.listen({port}, () =>
    console.log(`listening on localhost:${port}${gqlServer.graphqlPath}`)
);