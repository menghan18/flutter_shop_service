const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./router')
const json = require('koa-json')

// cors跨域
app.use(cors())
app.use(bodyparser())
app.use(json())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('service starting at port 3000')
})