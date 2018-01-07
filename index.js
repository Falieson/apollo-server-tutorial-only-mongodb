import express from 'express'
import { graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import bodyParser from 'body-parser'
import schema from './data/schema'

import {openMongo} from './data/connectors'

import {webaddress} from './utils/string'

openMongo()

const GRAPHQL_PORT = 3000
const GRAPHQL_REST = '/graphql'
const GRAPHQL_EXPLORE = '/graphiql'

const graphQLServer = express()

graphQLServer.use(GRAPHQL_REST, bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use(GRAPHQL_EXPLORE, graphiqlExpress({ endpointURL: GRAPHQL_REST}))

graphQLServer.listen(GRAPHQL_PORT, ()=> {
  console.log(`\n\n\n\n\n\n\n\n\n
      🌐      GraphQL Server      🌐

    📡  ${webaddress({
      port: GRAPHQL_PORT,
      path: GRAPHQL_EXPLORE,
    })}
    ➿  ${webaddress({
      port: GRAPHQL_PORT,
      path: GRAPHQL_REST,
    })}
  `)
})
