import {Author, Post, View} from './connectors'
import {consoleError as handleError} from '../utils/errors'

function returnResolver(err, res) {
  if (err) return handleError(err)
  return res
}

const resolvers = {
  Query: {
    author(_, args) {
      return Author.findOne(args)
    },
    allAuthors(_, args) {
      return Author.find(args)
    },
    post(_, args) {
      return Post.findOne(args)
    },
    allPosts(_, args) {
      return Post.find(args)
    }
  },
  Author: {
    posts(author) {
      return Post.find({authorId: author._id}, returnResolver)
    }
  },
  Post: {
    author(post) {
      return Author.findOne({ _id: post.authorId}, returnResolver)
    },
    views(post) {
      return View.findOne({ postId: post._id }, returnResolver)
    }
  },
  View: {
    post(view) {
      return Post.findOne({viewId: view._id}, returnResolver)
    }
  }
};

export default resolvers;