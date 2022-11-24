const express = require("express")
let Pokemon = require("../models/pokemon")
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

    //find the last pokemon id in the array and add one to it to pass it back to new ejs as the new pokemon id

    let lastPokemonId = Pokemon[Pokemon.length - 1].id
    
    let newPokemonId = +lastPokemonId + 1

    res.render("new.ejs", {newPokemonId})
    
})

// Edit route - GET /pokemon/:id/edit
router.get("/pokemon/:id/edit", (req,res) => {


    let id = req.params.id
    //select a specific pokemon by pokemonID
    let selectPokemon = Pokemon.filter(obj => obj.id === id)
    console.log(selectPokemon)

    //only pass in the select pokemon object

    res.render("edit.ejs", {Pokemon: selectPokemon} )
    
})

// Destroy route - DELETE /pokemon/:id
router.delete("/pokemon/:id", (req,res) => {

    let id = req.params.id

    //find the index of the object with the ID in the array
    const removePokemonWithId = (arr, id) => {
        const findObjById = arr.findIndex((obj) => obj.id === id)

        if (findObjById > -1) {
            arr.splice(findObjById,1)
        }
        return arr;
    } 

    //invoke removePokemonWithId function
    Pokemon = removePokemonWithId(Pokemon, id)

    //redirect to the homepage
    res.redirect("/pokemon")
    
})

// Show route - GET /pokemon/:id
router.get("/pokemon/:id", (req,res) => {

    //show the stats of a single Pokemon
    res.render("show.ejs", {Pokemon, id: req.params.id})
    
})

// Update route - PUT /pokemon/:id
router.put("/pokemon/:id", (req,res) => {

    const id = req.params.id
    //updating the pokemon entry
    const indexOfPokemon = Pokemon.findIndex((obj) => obj.id === id)
    
    //updating pokemon
    Pokemon[indexOfPokemon] = req.body
    
    //need to redirect to the main page
    res.redirect("/pokemon")
})



//////////////////////////////////////////
//Export the router
//////////////////////////////////////////
module.exports = router
