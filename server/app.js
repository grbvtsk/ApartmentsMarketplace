const express = require("express");
const apartmentsRouter = require("./apartmentsRouter");
const cors = require("cors")
const bodyParser = require ("body-parser");
const app = express()

app.use(cors())
app.use(bodyParser.json());

app.use("/market", apartmentsRouter);

app.listen(8000,()=>{
    console.log("app started")})
