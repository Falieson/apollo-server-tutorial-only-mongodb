import {Author, Post, View} from './models/'

const resolvers = {
  Author: {
    posts(author) {
      return Post.find({authorId: author._id})
    }
  },
  Post: {
    author(post) {
      return Author.findOne({ _id: post.authorId})
    },
    views(post) {
      return View.findOne({ postId: post._id })
    }
  },
  View: {
    post(view) {
      return Post.findOne({viewId: view._id})
    }
  },
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
  Mutation: {
    addAuthor(_, args) {
      return Author.create(args)
    }
  }
}

export default resolvers