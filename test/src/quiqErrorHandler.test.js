const expect = require("chai").expect
const quiqErrorHandler = require("../../src/quiqErrorHandler")
// const mockData = require("../__mocks__/eventStubWithEmail.json")

describe("quiqErrorHandler", () => {
  it("Calls next given the proper data", () => {
    const req = {}
    const res = {}
    const next = function() {}
    quiqErrorHandler(req, res, next)
  })
})
