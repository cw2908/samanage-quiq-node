const expect = require("chai").expect
const {createIncident, quiqToIncident} = require("../../src/createIncident")
const mockData = require("../__mocks__/eventStubWithEmail")
const badMockData = require("../__mocks__/eventStubNoReqEmail")

// Compare if two json objects are the same
const compare = (a, b) =>  JSON.stringify(a) === JSON.stringify(b) && typeof a === Object




describe("quiqToIncidentFunction", () => {
  before(() => {
    // setup data
    const convertedIncident = quiqToIncident(mockData)
    const expectedIncident = {
      incident: {
        name: "Test",
        description: "Description",
        assignee: {email: "chris.walls+apitest@samanage.com"},
        requester: {email: "chris.walls+apitest@samanage.com"}
      }
    }
    it("should receive matching assigneeEmail, requesterEmail && description", () =>
      expect(compare(convertedIncident, expectedIncident)).to.eq(true)
    )
    it("should receive assigneeEmail, requesterEmail && description", () => {
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
    it("should create an incident and receive an ID", () => {
      createIncident()
    })
  })
})