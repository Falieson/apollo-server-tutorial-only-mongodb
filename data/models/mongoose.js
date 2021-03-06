import mongoose from 'mongoose'
import {consoleError as handleError} from '../../utils/errors'

mongoose.Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId
const ObjectId = mongoose.Types.ObjectId

class MongooseModel {
  constructor({
    title='CollectionName',
    schema = {}
  } = {}) {
    this.title = title
    
    this.schema = new mongoose.Schema({
      _id: ObjectIdType
    })
    this.addToSchema(schema)

    this.defaultReturn = (err, res) => {
      if (err) {return handleError(err)}
      return res
    }

    this.defaultRecord = () => ({
      _id: new ObjectId()
    })
  }

  init() {
    this.Collection = mongoose.model(this.title, this.schema)
  }

  addToSchema(moreSchema) {
    this.schema.add(moreSchema)
  }

  findOne(args = {}, cb = this.defaultReturn) {
    return this.Collection.findOne(args, cb)
  }

  find(args = {}, cb = this.defaultReturn) {
    return this.Collection.find(args, cb)
  }

  async create(obj = {}) {
    const args = {
      ...this.defaultRecord(),
      ...obj
    }
    const record = new this.Collection(args)

    try {
      const savedRecord = await record.save()
      return savedRecord
    } catch (err) {
      handleError(err)
    }
  }

  count(args = {}, cb = this.defaultReturn) {
    return this.Collection.count(args, cb)
  }
}

export default MongooseModel