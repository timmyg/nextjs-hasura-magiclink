export default async (req, res) => {
  const { body } = req
  const gqlResponse = await fetch('https://poopasaurus-timmyg.herokuapp.com/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET
    },
    body: JSON.stringify(body),
  })
  const data = await gqlResponse.json()
  return res.status(200).json(data)
}
