var express = require("express");
const cors = require("cors");

var app = express();
app.use(cors());

const versionEndpoint = require("./endpoints/version.js");
const authEndpoint = require("./endpoints/auth.js");
const hrActionsEndpoint = require("./endpoints/hr-actions.js");
const candidateResumeEndpoint = require("./endpoints/candidate-resume.js");
const hrportalEndpoint = require("./endpoints/hrportal.js");

app.use("/version", versionEndpoint);
app.use("/auth", authEndpoint);
app.use("/hr-actions", hrActionsEndpoint);
app.use("/candidate-resume", candidateResumeEndpoint);
app.use("/hrportal", hrportalEndpoint);

var server = app.listen(process.env.PORT || 3020, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("API listening at http://%s:%s", host, port);
});
