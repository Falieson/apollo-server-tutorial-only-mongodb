import mongoose from 'mongoose'

import Model from './mongoose'

mongoose.Promise = global.Promise
const ObjectIdType = mongoose.Schema.Types.ObjectId

const Author = new Model({
  title : 'Author',
  schema: { 
    firstName: String,
    lastName : String,
    posts    : [{ type: ObjectIdType, ref: 'Post' }]
  }
})

const Post = new Model({
  title : 'Post',
  schema: { 
    _id     : ObjectIdType,
    title   : String,
    text    : String,
    viewId  : { type: ObjectIdType, ref: 'Author' },
    authorId: { type: ObjectIdType, ref: 'Author' }
  }
})

const View = new Model({
  title : 'View',
  schema: { 
    _id   : ObjectIdType,
    postId: { type: ObjectIdType, ref: 'Post' },
    views : Number
  }
})

export {
  Author,
  Post,
  View
}