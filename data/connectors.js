import casual from 'casual'
import _ from 'lodash'
import mongoose from 'mongoose'


import {webaddress} from '../utils/string'
import {consoleError as handleError} from '../utils/errors'
import {Author, Post, View} from './models/'

const MONGODB_NAME = 'blog'

function dbSchema() {
  Author.init()
  Post.init()
  View.init()
}

function fixtures() {
  // create mock data with a seed, so we always get the same
  casual.seed(123)
  _.times(10, () => {
    let author, post, view // eslint-disable-line no-unused-vars

    function handleNewAuthor(res) {
      author = res

      Post.create({
        title   : `A post by ${res.firstName}`,
        text    : casual.sentences(3),
        authorId: res._id    // assign the _id from the person
      }).then(p => handleNewPost(p))
    }
    function handleNewPost(res) {
      post = res

      View.create({
        views : casual.integer(0, 100),
        postId: res._id
      }).then(v => handleNewView(v))
    }
    function handleNewView(res) {
      view = res

      post.viewId = res._id
      post.save()
    }

    Author.create({
      firstName: casual.first_name,
      lastName : casual.last_name
    }).then(a => handleNewAuthor(a))
  })
}

function openMongo() {
  mongoose.connect(webaddress({
    path    : MONGODB_NAME,
    protocol: 'mongodb',
    port    : 27017
  }))
  const mongodb = mongoose.connection
  mongodb.on('error', console.error.bind(console, 'connection error:'))
  mongodb.once('open', () => {
    dbSchema()
    Post.count({}, (err, res) => { 
      if (err) {return handleError(err)}      
      res === 0 && fixtures() 
    })
  })
}

export {
  Author,
  Post,
  View,
  openMongo
}