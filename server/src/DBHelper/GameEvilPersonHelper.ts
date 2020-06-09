import Models from '../models';

const {GameEvilPerson} = Models;

interface IEvilPersonProps {
  name: string
  isForgive: boolean,
  number: number
  date: [string]
  tag: [string]
}

export default class InfoHelper {
  
  public static add = async(data: any) => {
    
    const info = await GameEvilPerson.findOne({name: data.name})
    if(info) {
      return {message: '添加失败，已经存在', code: 201}
    }
    
    const response = await GameEvilPerson.create({...data, updatedAt: new Date(), createdAt: new Date()})
    
    if(response) {
      return {message: '添加成功', code: 200}
    }
    
  }
  
  public static find = async(data: any) => {
    
    // tslint:disable-next-line:prefer-const
    let query: {name? : string, desc ?: string, metNumber? : number,status?: number} = {}
    if (data.name) {query.name = data.name}
    if (data.desc) {query.desc = data.desc}
    if (data.metNumber) {query.metNumber = data.metNumber}
    if (data.status) {query.status = data.status}
  
    const respone: any = await GameEvilPerson
    .find(query)
    .skip(Number(data.pageSize) * Number(data.current) - Number(data.pageSize))
    .limit(Number(data.pageSize))
    .sort({metNumber: -1})
    return respone ? {message: '成功', code: 200, data: respone} : {code: 201}
    
  }
  
  public static update = async(data: any) => {
    
    const respone = await GameEvilPerson.findByIdAndUpdate(data._id, {$set: {...data}})
    return respone ? {message: '成功', code: 200, data: respone} : {code: 201}
    
  }
  
  public static delete = async(data: any) => {
    const response = await GameEvilPerson.remove({_id: {$in: data.ids}});
    if(response.ok === 1) {
      return {message: '删除成功', code: 200}
    } else {
      return {message: '删除失败', code: 201}
    }
  }
  
  public static updateMany = async(data: any) => {
    const respone = await GameEvilPerson.updateMany({_id: {$in: data.ids}}, {
      $set: {
        status: data.status,
        updatedAt: new Date()
      }
    })
    return respone ? {message: '成功', code: 200, data: respone} : {code: 201}
  }
  
  public static findNameMany = async(data: any) => {
  
    const respone: any = await GameEvilPerson
    .find({name: { $in:data.names }})
  
    return respone ? {message: '成功', code: 200, data: respone} : {code: 201}
  
  }
  
  
  
}
