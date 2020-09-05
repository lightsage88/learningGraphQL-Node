const { GraphQLServer, PubSub } = require('graphql-yoga')
const _ = require('lodash')
const { PrismaClient } = require("@prisma/client")
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const Subscription = require('./resolvers/Subscription')

const prisma = new PrismaClient()
const pubsub = new PubSub()

//We are adding a new integer variable that serves as a rudiemtary way of
//creating unique IDs for newly created 'Link' elements
//The 'parent' argument in a resolver function is the result of the PREVIOUS resolver function
const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Vote,
  Subscription
          //   Query: {
          //     info: () => `This is the API of a Hackernews Clone`,
          //     feed: async (parent, args, context, info) => {
          //       return context.prisma.link.findMany()
          //     },
          //     link: async(parent, args, context, info) => {
          //       let links = await context.prisma.link.findMany()
          //       let desiredLink = findLinkById(args, links)
          //       return desiredLink
          //     }
          //   }, 
          //   Mutation: {
          //     //The implementation of a 'post' resolver creates a new Link object
          //     //Then it pushes the new 'link' into 'links', then returns the 'link' that was pushed as a response

          // //The 'args' argument are the args that are fed into the mutation called 'post',
          // //In post's case it will be the 'description' and 'url' arguments' values.
          //     post: (parent, args, context, info) => {
          //       const newLink = context.prisma.link.create({
          //         data: {
          //           url: args.url,
          //           description: args.description
          //         }
          //       })

          //       return newLink
          //     },
          //     updateLink: async (parent, args, context, info) => {
          //       let links = await context.prisma.link.findMany()
          //       let desiredLink = findLinkById(args, links)
          //       const link = {
          //         id: args.id,
          //         description: args.description || desiredLink.description,
          //         url: args.url || desiredLink.url
          //       }
          //       for(let i = 0; i < links.length; i ++) {
          //         if(links[i].id === link.id ) {
          //           links[i] = link
          //         }
          //       }
                
          //       return link
          //     },
          //     deleteLink: (parent, args) => {
          //       let desiredIndex = _.findIndex(links, function(o) {
          //         return o.id == args.id
          //       })
          //       links = _.without(links, links[desiredIndex])
          //       return links
          //     }
          //   },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,

  //Now we turne context into a function that returns the context.
  //We can attach the HTTP request that carries the incoming GraphQL query/mutation to the context as well. This allows resolvers to read
  //the Authorization header and validate if the user who submitted the request is elligible to perform the requested action
  context: request => {
    return {
      ...request,
      prisma,
      pubsub
    }
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))