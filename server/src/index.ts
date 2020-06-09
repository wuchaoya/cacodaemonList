/**
 * Created by chao
 */

import * as koa from 'koa';
import koaBody = require('koa-body');
import serve = require("koa-static")
import * as cors from 'koa2-cors';
import path = require("path");
import Logger = require('./config/logger');
import * as mongoDB from './mongoDB';
import router from './router';

const app = new koa();

const heade = {
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  allowMethods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  origin: () => '*',
}

mongoDB.connect();

 app

  .use(cors(heade))
 
  .use(serve(path.join(__dirname, '/public')))
 
  .use(koaBody({multipart: true}))
  
  .use(router.routes())

  .use(router.allowedMethods())

  .use(Logger.accessLogger())

  .listen(8080);

global.console.log('http://localhost:8080/');
