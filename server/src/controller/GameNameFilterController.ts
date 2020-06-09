import fs = require("fs");
import { Context } from 'koa';
import path = require("path");
import DBHelper from '../DBHelper';

const { GameNameFilterHelper } = DBHelper;
// tslint:disable-next-line:no-var-requires
const AipOcrClient = require("baidu-aip-sdk").ocr;

const createFile = (file: any) =>{
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(path.join(__dirname + '/../public/images', file.name))
  reader.pipe(stream)
  return new Promise((resolve, reject) => {
    reader.on('end', (chunk) => {
      const img = fs.readFileSync(__dirname + '/../public/images/' + file.name).toString("base64")
      resolve(img)
    })
  })
}

const filter = (arr: [], filterArr:any) => {
  console.log(arr,filterArr);
  let newArr: any = []
    arr.map((item: {words: string}) => {
    if (filterArr.indexOf(item.words) === -1 && newArr.indexOf(item.words) === -1) {
      newArr.push(item)
    }
  })
  return newArr
}

export default class GameNameFilterController {
  
  
  public static async orc (ctx: Context) {
    
    const file = ctx.request.files.file
    const img = await createFile(file)
    const APP_ID = "20244798";
    const API_KEY = "Zlxyh0Xmq5mwgtLwExQkn79p";
    const SECRET_KEY = "ydwFneEZeLzHOw6zpSwkfuUfdmzwkfZZ";
    const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
    const response = await client.generalBasic(img)
    const filterList = await GameNameFilterHelper.find()
    ctx.body = response.words_result ?
      {message: '成功', code: 200 ,data: filter(response.words_result, filterList) } :
      {message: '失败', code: 201}
    
  }
  
  public static async add (ctx: Context) {
    const response = await GameNameFilterHelper.addMany(ctx.request.body);
    ctx.body = response;
  }
  
  
}
