import {makeExecutableSchema} from 'graphql-tools' // addMockFunctionsToSchema,
// import mocks from './mocks'
import resolvers from './resolvers'

const typeDefs = `
type Author {
  _id: String
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  _id: String
  title: String
  text: String
  viewId: String
  authorId: String
  views: View
  author: Author
}
type View {
  _id: String
  views: Int
  postId: String
  post: Post
}

type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String # we'll use this later

  post(title: String): Post
  allPosts(authorId: String): [Post]
}

type Mutation {
  # A mutation to add a new channel to the list of channels
  addAuthor(firstName: String!, lastName: String!): Author
}
`


const schema = makeExecutableSchema({ typeDefs, resolvers })
// addMockFunctionsToSchema({ schema, mocks })

export default schema