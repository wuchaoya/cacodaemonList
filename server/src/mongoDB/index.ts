/**
 * Created by chao
 */

import * as mongoose from 'mongoose';
import { Path } from '../config/mongodbConfig';

(mongoose as any).Promise = global.Promise;

mongoose.set('useFindAndModify', false);

export const DB = mongoose;

export const { Schema } = DB;

export const connect = () => {
  
  DB.connect(Path, {useNewUrlParser: true}, (err) => {
    global.console.log(err ? 'Connection Error:' + err : 'Connection success!')
  }).then(r  => (r));
  
  DB.connection.on('error', error => {
    global.console.error('数据库连接失败!', error)
  })
  
  DB.connection.once('open', () => {
   global.console.log('数据库连接成功!')
  })
  
  return DB;
  
}
