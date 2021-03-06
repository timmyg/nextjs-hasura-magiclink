const MessagingResponse = require('twilio').twiml.MessagingResponse;

export default async (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    const babyId = 1;

    const activityFullText = req.body.Body.trim();
    const words = activityFullText.split(" ")
    const activityText = words[0].toLowerCase()
    if (!["poop", "feed", "nap"].includes(activityText.toLowerCase())) {
      return res.status(400).json({message: "invalid text"})
    }

    const gqlResponse = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET
        },
        body: JSON.stringify(
          {
            "query":"mutation insert_single_activity($object: activities_insert_input! ) {insert_activities_one(object: $object) { id type baby_id created_at updated_at start_at }}",
            "variables": {
              "object": {
                text: activityFullText,
                type: activityText,
                baby_id: babyId,
                source: "sms",
              }
            },
            "operationName":"insert_single_activity"}
        ),
      })
    const gqlResponseData = await gqlResponse.json()
    console.log("gqlResponse", gqlResponseData)

    return res.status(200).json({message: "ok"})
}
