import { Context } from 'koa';
import DBHelper from '../DBHelper';

const { GameEvilPersonHelper } = DBHelper;

export default class GameEvilPersonController {
  
  public static async add (ctx: Context) {
    const response = await GameEvilPersonHelper.add(ctx.request.body);
    ctx.body = response;
  }
  
  public static async delete (ctx: Context) {
    const response = await GameEvilPersonHelper.delete(ctx.request.body);
    ctx.body = response;
  }
  
  public static async find (ctx: Context) {
    const response = await GameEvilPersonHelper.find(ctx.query);
    ctx.body = response;
  }
  
  public static async findNameMany (ctx: Context) {
    const response = await GameEvilPersonHelper.findNameMany(ctx.request.body);
    ctx.body = response;
  }
  
  public static async update (ctx: Context) {
    const response = await GameEvilPersonHelper.update(ctx.request.body);
    ctx.body = response;
  }
  
  public static async updateMany (ctx: Context) {
    const response = await GameEvilPersonHelper.updateMany(ctx.request.body);
    ctx.body = response;
  }
  
  
}
