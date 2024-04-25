require("dotenv").config();
const {PORT, HOST} = process.env;
const {error} = require("./helpers/response");
const {app} = require('./app');
const requireDir = require("require-dir");
const httpServer = require("http").createServer(app);
const connectToDb = require("./config/config")

requireDir("./controllers", {recurse: true});
requireDir("./routes");

app.use(function (err, req, res, next) {
    res.json(error(err.message))
})


httpServer.listen(Number(PORT), HOST, async () => {
    await connectToDb();
    console.log(`server listening on ${HOST}:${PORT}`)
}) 