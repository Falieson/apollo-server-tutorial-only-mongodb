import mongoose, { Schema } from 'mongoose'

import casual from 'casual';
import _ from 'lodash';

import {webaddress} from '../utils/string'
import {consoleError as handleError} from '../utils/errors'

mongoose.Promise = global.Promise;

const MONGODB_NAME = 'blog'

let Author, Post, View;

function dbSchema() {
  const AuthorSchema = new Schema({ 
    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  })
  Author = mongoose.model('Author', AuthorSchema);

  const PostSchema = new Schema({ 
    _id: Schema.Types.ObjectId,
    title: String,
    text: String,
    viewId: { type: Schema.Types.ObjectId, ref: 'Author' },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  })
  Post = mongoose.model('Post', PostSchema);

  const ViewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    views: Number,
  });
  View = mongoose.model('View', ViewSchema);
}

function fixtures() {
  // create mock data with a seed, so we always get the same
  casual.seed(123);
  _.times(10, () => {
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      firstName: casual.first_name,
      lastName: casual.last_name,
    })

    author.save(err => {
      if (err) return handleError(err);

      var post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
        authorId: author._id    // assign the _id from the person
      });
      
      post.save(function (err) {
        if (err) return handleError(err);

        new View({
          _id: new mongoose.Types.ObjectId(),
          views: casual.integer(0, 100),
          postId: post._id,
        }).save(function (err, res) {
            post.viewId = res._id
            post.save()
          }
        )
      });  
    })
  })
}

function openMongo() {
  mongoose.connect(webaddress({
    path: MONGODB_NAME,
    protocol: 'mongodb',
    port: 27017
  }));
  var mongodb = mongoose.connection;
  mongodb.on('error', console.error.bind(console, 'connection error:'));
  mongodb.once('open', function() {
    dbSchema()
    Post.count({}, function(err, res){ 
      res === 0 && fixtures() 
    })
  });
}

export {
  Author,
  Post,
  View,
  openMongo
};