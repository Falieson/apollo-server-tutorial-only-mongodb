/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'

import schema from './data/schema'
import {openMongo} from './data/connectors'
import {webaddress} from './utils/string'

openMongo()

const GRAPHQL_PORT = 3000
const GRAPHQL_REST = '/graph'
const GRAPHQL_EXPLORE = '/graphi'

const graphQLServer = express()

graphQLServer.use(GRAPHQL_REST, bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use(GRAPHQL_EXPLORE, expressPlayground({ endpoint: GRAPHQL_REST}))

graphQLServer.listen(GRAPHQL_PORT, ()=> {
  console.log(`\n\n\n\n\n\n\n\n\n
      🌐      GraphQL Server      🌐

    🎮  ${webaddress({ // explorer
    port: GRAPHQL_PORT,
    path: GRAPHQL_EXPLORE
  })}
    📡  ${webaddress({ // endpoint
    port: GRAPHQL_PORT,
    path: GRAPHQL_REST
  })}
  `)
})


if(process.NODE_ENV === 'development' || null) {
  // NOTE: NODEMON ISSUE
  process.on('SIGINT', () => {
    console.log('Bye bye!')
    process.exit() // eslint-disable-line no-process-exit
  })
}
