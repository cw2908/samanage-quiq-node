// Server file
// Can test locally with POST data to
// localhost:5001/api/samanage -v
// ==> curl -d '{"data":[1,2,3]}' -H 'Content-Type:application/json' https://localhost:5001/api/samanage -v

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/routes.js")


const port = process.env.SAMANAGE_QUIQ_PORT || 5001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/samanage", Routes.samanage)



// Don't rerun if there is a parent module (for test suites)
if(!module.parent){  
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app