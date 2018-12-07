const asyncRoute = require("./asyncRoute.js")

const {validateIncident, createIncident, quiqToIncident } = require("../src/createIncident")



// Samanage route creates incident from quiq event and sends response message
const samanage = async (req, res) => {
  let errorMessage = ""
  let customResponse = {}
  const validation = validateIncident(req.body)
  
  // If validated created incident and setup response
  if(validation.validated){
    const incident = quiqToIncident(req.body)
    const response = await createIncident(incident)
    if (response.status === 200) {
      customResponse = {message: "Success", status: 200}
    } else {
      customResponse = {message: `Failed to create incident:  ${incident}`, status: 400}
    }
    // Otherwise return reason for invalid
    validation.requesterEmail ? null : errorMessage += "No Email Found\n"
    validation.conversationClosed ? null : errorMessage += `Event type not found received: ${JSON.stringify(quiqEvent)}\n`
    customResponse = {message: errorMessage, status: 400}
  }
  res
    .status(customResponse.status)
    .end(quiqEvent.message)
}

console.log({asyncRoute})
console.log({samanage})
console.log({sR: asyncRoute(samanage)})
module.exports = {
  samanage: asyncRoute(samanage)
}
