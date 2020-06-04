import * as Koa from 'koa';
import * as log4js from 'koa-log4';
import * as path from 'path'

log4js.configure({
  appenders: {
    access: {
      filename: path.join('back-end/logs/', 'access.log'), // 生成文件名
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      type: 'dateFile',
    },
    application: {
      filename: path.join('back-end/logs/', 'application.log'),
      pattern: '-yyyy-MM-dd.log',
      type: 'dateFile',
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    access: { appenders: [ 'access' ], level: 'info' },
    application: { appenders: [ 'application' ], level: 'WARN'},
    default: { appenders: [ 'out' ], level: 'info' },
  }
});

// 记录所有访问级别的日志
export const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
// 记录所有应用级别的日志
export const applicationLogger = log4js.getLogger('application');


