const MessagingResponse = require('twilio').twiml.MessagingResponse;

export default async (req, res) => {
    const twiml = new MessagingResponse();
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    twiml.message('The Robots are coming! Head for the hills!');
    return res.status(200).json(data)
}
