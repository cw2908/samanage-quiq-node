module.exports = (req, res, next) => {
  const eventType = req && req.body && req.body.eventType
  const eventKeys = req && req.body && Object.keys(req.body)
  console.log(`Handling event type: ${eventType}\n${eventKeys}`)
  // console.log({req})
  next()
}