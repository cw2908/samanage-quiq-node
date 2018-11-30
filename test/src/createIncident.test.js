const expect = require("chai").expect
const {createIncident, quiqToIncident} = require("../../src/createIncident")
const mockData = require("../__mocks__/eventStubWithEmail")
const BadMockData = require("../__mocks__/eventStubNoReqEmail")

// Compare if two objects are the same
const compare = (a, b) =>  JSON.stringify(a) === JSON.stringify(b)



describe("quiqToIncidentFunction", () => {
  it("should receive assigneeEmail, requesterEmail && description", () => {
    const convertedIncident = quiqToIncident(mockData)
    const expectedIncident = {
      incident: {
        name: "Test",
        description: "Description",
        assignee: {email: "chris.walls@samanage.com"},
        requester: {email: "chris.walls+apitest@samanage.com"}
      }
    }
    expect(compare(convertedIncident, expectedIncident)).to.eq(true)
  })
  it("should receive assigneeEmail, requesterEmail && description", () => {
    const convertedIncident = quiqToIncident(BadMockData)
    const expectedIncident = {
      incident: {
        name: "Test",
        description: "Description",
        assignee: {email: "chris.walls@samanage.com"},
        requester: {email: "chris.walls+apitest@samanage.com"}
      }
    }
    expect(compare(convertedIncident, expectedIncident)).to.eq(false)
  })
})