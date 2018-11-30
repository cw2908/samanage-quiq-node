// Check async route testing here: https://itnext.io/using-async-routes-with-express-bcde8ead1de8

const expect = require("chai").expect
const request = require("supertest")
const app = require("../../server")
const mockReq = require("../__mocks__/eventStubWithEmail.json") // stubbed from quiq
const mockNoEmailReq = require("../__mocks__/eventStubNoReqEmail.json") // stubbed from quiq

describe("Route Handler", () => {
  describe("/api/samanage route", () => {
    it("returns success given an event with requester email", async () => {
      return request(app)
        .post("/api/samanage")
        .send(mockReq)
        .set("Accept","application/json")
        .expect(200)
        .then(res =>  {
          expect(res.text).to.match(/Success/)
        })
    })
    it("returns success given an event with requester email", async () => {
      return request(app)
        .post("/api/samanage")
        .send(mockNoEmailReq)
        .set("Accept","application/json")
        .expect(400)
        .then(res =>  {
          expect(res.text).to.match(/No Email Found/)
        })
    })
    // Request should payload should have key eventType (req.body.eventType)
    it("returns 400 status code if given invalid event data", () => {
      let mockBadReq = {event: "test", type: null} // should be eventType
      return request(app)
        .post("/api/samanage")
        .send(mockBadReq)
        .set("Accept","application/json")
        .expect(400)
        .then(res => {
          const responseMessage = res && res.text
          expect(responseMessage).to.match(/Event type not found received:/)
        })
    })
  })
})



// describe("handleQuiqEvent"), () => {
//   it("Returns success given")
// }
