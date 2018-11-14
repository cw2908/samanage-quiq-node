const expect = require("chai").expect
const request = require("supertest")
const app = require("../server")


let req = { 
  event: {
    type: "conversationClosed"
  }
}


describe("Greetings Route", () => {
  describe("samanage() function", () => {
    it("Should return success given an event", async () => {
      return request(app)
        .post("/api/samanage")
        .send(req)
        .set("Accept","application/json")
        .expect(200)
        .then(res =>  {
          expect(res.body.message).to.equal("Success")
        })
    })
    it("Should return an error if not given an event", () => {
      return request(app)
        .post("/api/samanage")
        .send({})
        .set("Accept","application/json")
        .expect(400)
        .then(res => {
          const responseMessage = res && res.body && res.body.message
          expect(responseMessage).to.match(/Event type not found received:/)
        })
    })
  })
})
