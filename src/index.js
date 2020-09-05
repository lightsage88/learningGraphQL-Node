const { GraphQLServer } = require('graphql-yoga')
const findLinkById = require('./helperMethods/findLinkById')
const _ = require('lodash')
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

//We are adding a new integer variable that serves as a rudiemtary way of
//creating unique IDs for newly created 'Link' elements
let idCount = links.length
//The 'parent' argument in a resolver function is the result of the PREVIOUS resolver function
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      let desiredLink = findLinkById(args, links)
      return desiredLink
    }
  }, 
  Mutation: {
    //The implementation of a 'post' resolver creates a new Link object
    //Then it pushes the new 'link' into 'links', then returns the 'link' that was pushed as a response

//The 'args' argument are the args that are fed into the mutation called 'post',
//In post's case it will be the 'description' and 'url' arguments' values.
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      let desiredLink = findLinkById(args, links)
      const link = {
        id: args.id,
        description: args.description || desiredLink.description,
        url: args.url || desiredLink.url
      }
      for(let i = 0; i < links.length; i ++) {
        if(links[i].id === link.id ) {
          links[i] = link
        }
      }
      
      return link
    },
    deleteLink: (parent, args) => {
      let desiredIndex = _.findIndex(links, function(o) {
        return o.id == args.id
      })
      links = _.without(links, links[desiredIndex])
      return links
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))