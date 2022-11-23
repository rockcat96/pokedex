const express = require("express")
const Pokemon = require("../models/pokemon")
const router = express.Router()


//////////////////////////////////////////
//Actual routes
//////////////////////////////////////////

//  Home route - Redirects you to the index page
router.get("/", (req,res) => {
    res.redirect("/pokemon")
})

// Index route - GET /pokemon
router.get("/pokemon", (req,res) => {

    res.render("index.ejs", {Pokemon})

})

// Create route - POST /pokemon
router.post("/pokemon", (req,res) => {
    
    //receive the data from the form and push it to the pokemon data
    Pokemon.push(req.body)

    //redirecting the user back to the main page
    res.redirect("/pokemon")
    
})

// New route - GET /pokemon/new
router.get("/pokemon/new", (req,res) => {

    res.render("new.ejs")
    
})

// Edit route - GET /pokemon/:id/edit
router.get("/pokemon/:id/edit", (req,res) => {

    res.render("edit.ejs", {Pokemon} )
    
})

// Destroy route - DELETE /pokemon/:id
router.post("/pokemon/:id", (req,res) => {

    const id = req.params.id
    let index = +id - 1
    
    //remove the pokemon with the matching id from the pokemon array
    Pokemon.splice(index,1)

    //redirect to the homepage
    res.redirect("/pokemon")
    
})

// Show route - GET /pokemon/:id
router.get("/pokemon/:id", (req,res) => {

    //show the stats of a single Pokemon
    res.render("show.ejs", {Pokemon, id: req.params.id})
    
})

// Update route - PUT /pokemon/:id
router.post("/pokemon/:id", (req,res) => {

    //updating the pokemon entry
    
    //need to redirect to the main page
    res.redirect("/pokemon ")
})



//////////////////////////////////////////
//Export the router
//////////////////////////////////////////
module.exports = router