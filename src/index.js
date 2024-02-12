const cassandraClient = require("./database/cassandraConnection");
const express = require("express");
const logger = require("./middlewares/logger.middleware");
const textRoutes = require("./routes/textRoutes");

const app = express();

app.use(logger);
app.use(textRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000")
})