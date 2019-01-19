// Server file
// Can test locally with POST data to
// localhost:5001/api/samanage -v
// ==> curl -d @./test/__mocks_/SOME_EVENT_DATA.json -H 'Content-Type:application/json' http://localhost:5001/api/samanage -v

require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/routes.js")
const quiqErrorHandler   = require("./src/quiqErrorHandler")
const port = process.env.PORT || 5001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(quiqErrorHandler) // import your own error handler here
app.post("/api/samanage", Routes.samanage)



// Don't rerun if there is a parent module (for test suites)
if(!module.parent){  
  app.listen(port, () => console.log(`Listening on port ${port}`)) // eslint-disable-line
}
// Export for use in tests
module.exports = app