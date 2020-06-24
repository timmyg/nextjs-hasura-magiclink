const MessagingResponse = require('twilio').twiml.MessagingResponse;

export default async (req, res) => {
    const twiml = new MessagingResponse();
    const babyId = 1;
    console.log(process.env.GRAPHQL_ENDPOINT, process.env.HASURA_GRAPHQL_ADMIN_SECRET);
    console.log(req.body.Body, babyId);

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
                text: req.body.Body.trim(),
                baby_id: babyId
              }
            },
            "operationName":"insert_single_activity"}
        ),
      })
    const data = await gqlResponse.json()
    console.log({data: JSON.stringify(data)});

    return res.status(200).json({message: "ok"})
}
