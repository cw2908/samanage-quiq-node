require("dotenv").config()
const SamanageAPI = require("samanage-api")
const connection = new SamanageAPI.Connection(process.env.SAMANAGE_API_TOKEN)

// body should be received as https://developers.goquiq.com/api/docs#operation/Webhook%20-%20ConversationStatusChanged
const quiqToIncident = (body) => {
  const eventData = body.data
  const assignee = process.env.NODE_ENV === "development"
    ? process.env.TEST_ASSIGNEE || eventData && eventData.owner
    : eventData && eventData.owner
  // const assignee = eventData && eventData.owner
  const requester = eventData && eventData.customer && eventData.customer.email 
  const messages = eventData && eventData.messages && eventData.messages
  const name = messages && messages[0] && eventData.messages[0].text
  console.log({messages})
  const description = messages.map(message => {
    console.log({message})
    let authorString
    authorString = new String(message.author).includes("@") ? `${message.author}: ` : ""
    if (authorString === "" && message.fromCustomer) {
      authorString = `${requester}`
    }
    return `${authorString}: ${message.text}`
  }).join("\n\n")
  return {
    name,
    description,
    assignee: {email: assignee},
    requester: {email: requester}
  }
}
const createIncident = async (incident) => {
  const request = SamanageAPI.create("incident")(incident)
  return await connection.callSamanageAPI(request)
}
const validateIncident = (quiqEvent) => {
  const eventType = quiqEvent && quiqEvent.eventType
  const conversationClosed = eventType === "ConversationClosed"
  const requesterEmail = quiqEvent && quiqEvent.data && quiqEvent.data.customer && quiqEvent.data.customer.email
  const ownerEmail = quiqEvent && quiqEvent.data && quiqEvent.data.owner
  const validated = conversationClosed && requesterEmail && ownerEmail
  const validation = {
    validated: !!validated,
    requesterEmail,
    conversationClosed,
    ownerEmail
  }
  return validation
}

module.exports = {
  createIncident,
  quiqToIncident,
  validateIncident
}