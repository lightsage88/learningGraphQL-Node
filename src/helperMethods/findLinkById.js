
const findLinkById = (args, links) => {
  let desiredLink
  links.forEach(el => {
    if(el.id === Number(args.id)) {
      desiredLink = el
    }
  })
  return desiredLink
}

module.exports = findLinkById