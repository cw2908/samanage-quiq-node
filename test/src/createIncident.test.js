const expect = require("chai").expect
const {createIncident, quiqToIncident, validateIncident} = require("../../src/createIncident")
const mockData = require("../__mocks__/eventStubWithEmail")
// const badMockData = require("../__mocks__/eventStubNoReqEmail")

// Compare if two json objects are the same
const compare = (a, b) =>  JSON.stringify(a) === JSON.stringify(b) && typeof a === "object"




describe("quiqToIncidentFunction", () => {
  const convertedIncident = quiqToIncident(mockData)
  it("should receive matching assigneeEmail, requesterEmail && description", () => {
    const expectedIncident = {
      name: "Hi I need help",
      description: "Hi I need help\nchris.walls+apitest@samanage.com: Glad to help",
      assignee: {email: "chris.walls+apitest@samanage.com"},
      requester: {email: "chris.walls+apitest@samanage.com"}
    }
    console.log({convertedIncident}, {expectedIncident})
    expect(compare(convertedIncident, expectedIncident)).to.eq(true)
  }  )
  it("should create an incident and receive an ID", async () => {
    const samanageIncident = await createIncident(convertedIncident)
    const incidentId = samanageIncident && samanageIncident.data && samanageIncident.data.id
    expect(incidentId).to.be.a("number")
  })
  it("validates an incident has a requester, email, and closedConversation type", () => {
    const validation =  validateIncident(mockData)
    expect(validation.validated).to.be.ok
  })
})