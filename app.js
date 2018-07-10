const koa = require('koa');
const logger = require('koa-logger');

const app = new koa();

app.use(logger());

app.listen(8181, () => {
  console.log('Koa is listening in 8181');
})

module.exports = app;


