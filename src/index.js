require('dotenv').config()
const cassandraClient = require("./database/cassandraConnection");
const express = require("express");
const logger = require("./middlewares/logger.middleware");
const textRoutes = require("./routes/textRoutes");
const imageRoutes = require("./routes/imageRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(logger);
app.use(textRoutes);
app.use(userRoutes)
app.use(express.static("uploads"))
app.use(imageRoutes);

app.listen(process.env.PORT||3000,()=>{
    console.log(`listening on port ${process.env.PORT||3000}`)
})