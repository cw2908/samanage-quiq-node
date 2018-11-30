require("dotenv").config()
const SamanageAPI = require("samanage-api")
const connection = new SamanageAPI.Connection(process.env.SAMANAGE_API_TOKEN)


const quiqToIncident = (body) => {
  const eventData = body.data
  const assignee = eventData && eventData.owner
  const requester = eventData && eventData.customer && eventData.customer.email 
  return {
    incident: {
      name: "Test",
      description: "Description",
      assignee: {email: assignee},
      requester: {email: requester}
    }
  }
}
const createIncident = (body) => {
  const incident = quiqToIncident(body)
  const request = SamanageAPI.create("incident")(incident)
  console.log({request})
  return connection.callSamanageApi(request)
}

module.exports = {
  createIncident,
  quiqToIncident
}