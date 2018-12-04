require("dotenv").config()
const SamanageAPI = require("samanage-api")
const connection = new SamanageAPI.Connection(process.env.SAMANAGE_API_TOKEN)

// body should be received as https://developers.goquiq.com/api/docs#operation/Webhook%20-%20ConversationStatusChanged
const quiqToIncident = (body) => {
  const eventData = body.data
  const assignee = process.env.NODE_ENV === "development"
    ? process.env.TEST_ASSIGNEE || eventData && eventData.owner
    : eventData && eventData.owner
  const requester = eventData && eventData.customer && eventData.customer.email 
  const messages = eventData && eventData.messages && eventData.messages
  const name = messages && messages[0] && eventData.messages[0].text
  const description = messages.map(message => `${message.text}\n`)
  return {
    name,
    description,
    assignee: {email: assignee},
    requester: {email: requester}
  }
}
const createIncident = (body) => {
  const incident = quiqToIncident(body)
  const request = SamanageAPI.create("incident")(incident)
  // console.log({request})
  return connection.callSamanageApi(request)
}

module.exports = {
  createIncident,
  quiqToIncident
}