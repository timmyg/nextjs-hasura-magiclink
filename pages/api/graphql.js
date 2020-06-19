import moment from 'moment'

export default async (req, res) => {
  const { body } = req
  console.log(JSON.stringify(body));
  if (body.query.includes("insert_single_activity")) {
    const text = body.variables.object.text;
    const words = text.split(" ")
    const activityText = words[0]
    if (!["poop", "feed"].includes(activityText.toLowerCase())) {
      return res.status(400).json({errors: "Invalid input"})      
    }
    body.variables.object.type = activityText
    if(words.includes("at")) {
      const timeText = words[2]
      body.variables.object.start_at = moment(timeText, "hmma").utc().format()
    }
  }
  const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
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
