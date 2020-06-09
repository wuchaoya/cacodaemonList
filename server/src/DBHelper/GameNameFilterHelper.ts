import Models from '../models';

const {  GameNameFilter} = Models;

interface IEvilPersonProps {
  name: string
}

export default class InfoHelper {
  
  public static addMany = async(data: any) => {
    const respone = await GameNameFilter.insertMany(data.names)
    return respone ? {message: '成功', code: 200, data: respone} : {code: 201}
  }
  
  public static find = async () => {
    const respone = await GameNameFilter.find({}).distinct('name').exec()
    return respone
  }
  
}
