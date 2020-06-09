
import { DB, Schema } from '../mongoDB';

const GameNameFilterSchema = new Schema({
  name: {
    index: true,
    type: String,
    unique: true
  },
})

const GameNameFilter = DB.model('GameNameFilterSchema', GameNameFilterSchema);

export default GameNameFilter;
