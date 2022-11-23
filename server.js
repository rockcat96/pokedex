require("dotenv").config()

const express = require("express")
const methodOverride = require("method-override")
const morgan = require("morgan")

const port = process.env.PORT
const app = express()
const PokemonRouter = require("./controllers/pokemon")

////////////////////////////////////////////
////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
////////////////////////////////////////////
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev")) 
app.use(methodOverride("_method")) 
app.use("/static", express.static("public")) //It's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css
app.use(PokemonRouter)

app.listen(port, () => {
    console.log(`Currently groovin to port: ${port}`)
})