/**
 * Created by chao
 */
import { DB, Schema } from '../mongoDB';

const GameEvilPersonSchema = new Schema({
  createdAt: Date,
  desc: {type: String ,default: ''},
  metNumber: {type: Number, default: 1},
  name: {
    index: true,
    type: String,
    unique: true
  },
  status: {type: Number, min: 0, max: 1,default: 0},
  updatedAt: Date,
})

const GameEvilPerson = DB.model('GameEvilPersonSchema', GameEvilPersonSchema);

export default GameEvilPerson;
