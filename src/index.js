const { GraphQLServer } = require('graphql-yoga')


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
      let desiredLink
      links.forEach(el => {
        if(el.id === args.id) {
          desiredLink = el
        }
      })
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
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))