
const findLinkById = (args, links) => {
  links.forEach(el => {
    if(el.id === args.id) {
      desiredLink = el
    }
  })
  return desiredLink
}

module.exports = findLinkById