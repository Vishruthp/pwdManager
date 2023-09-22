var nano = require('nano');
const dbconnectionstring = "http://usr:pwd@127.0.0.1:5984";
module.exports = nano(dbconnectionstring);