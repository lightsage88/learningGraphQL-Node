const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

//main function is to send queries to the database
//You will write all your queries inside of this function
async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstack tutorial for GraphQL",
      url: "www.howtographql.com"
    }
  })
  const allLinks = await prisma.link.findMany()
  const amount = await prisma.link.count()
  console.log(amount, allLinks)
}

//we call the main function the one from above
main()
  .catch(e => {
    throw e
  })
  //we close the database connection when the script terminates
  .finally(async () => {
    await prisma.disconnect()
  })