module.exports = {
  samanage: function(req, res) {
    try {

      const eventType = req && req.body && req.body.event && req.body.event.type
      eventType == "conversationClosed"
        ? res.send({message: "Success"}) 
        : res.status(400).send({message: `Event type not found received: ${req.body}`})
    } 
    catch (error) {
      res.send({message: "Error"})
    }
  }
}
