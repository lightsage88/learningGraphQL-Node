const findLinkById = require("../helperMethods/findLinkById")

function feed(parent, args, context, info) {
  return context.prisma.link.findMany()
}

//link: async(parent, args, context, info) => {
  //       let links = await context.prisma.link.findMany()
  //       let desiredLink = findLinkById(args, links)
  //       return desiredLink
  //     }

async function link(parent, args, context, info) {
  let links = await context.prisma.link.findMany()
  let desiredLink = findLinkById(args, links)
  return desiredLink

}

module.exports = {
  feed,
  link
}