const SamanageAPI = require("samanage-api")
const fs = require("fs")
const { createIncident, quiqToIncident } = require("../src/createIncident")
const connection = new SamanageAPI.Connection(process.env.SAMANAGE_API_TOKEN)

const handleQuiqEvent = (quiqEvent) => {
  // console.log({handler: quiqEvent})
  let errorMessage = ""
  const eventType = quiqEvent && quiqEvent.eventType
  const conversationClosed = eventType == "ConversationClosed"
  const requesterEmail = quiqEvent && quiqEvent.data && quiqEvent.data.customer && quiqEvent.data.customer.email
  const validated = requesterEmail && conversationClosed
  if (validated) {
    const incident =  quiqToIncident(quiqEvent) // Existence was checked within validated
    const request = SamanageAPI.create("incident")(incident)
    console.log({incident})
    console.log({request})
    returnconnection.callSamanageApi(request)
      .then(res => {
        console.log({res})
        return {message: "Success", status: 200}
      })
      .catch(failure => {
        console.log({failure})
        return {message: `Failure ${failure}`, status: 400}
      })
  } else {
    requesterEmail ? null : errorMessage += "No Email Found\n"
    conversationClosed ? null : errorMessage += `Event type not found received: ${JSON.stringify(quiqEvent)}\n`
    return {message: errorMessage, status: 400}
  }
}

// Save inbound requests in development / test
const saveQuiqEvent = (quiqEvent, callback) => {
  const timestamp = quiqEvent && quiqEvent.timestamp ||  new Date().getTime()
  const eventId = quiqEvent && quiqEvent.id || "unknownId"
  const filename = `.private/quiqEvent-${eventId}-${timestamp}.json`
  process.env.NODE_ENV === "development"
    ? fs.writeFile(filename, JSON.stringify(quiqEvent), callback)
    : callback()
}


// Samanage route
const samanage = (req, res) => {
  saveQuiqEvent(req.body, () => {
    const quiqEvent = handleQuiqEvent(req.body)
    res.status(quiqEvent.status).end(quiqEvent.message)
  })
}

module.exports = {
  samanage
}
