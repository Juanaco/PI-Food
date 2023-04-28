const { json } = require("body-parser");
const { createRecipe, getRecipeDetail, searchRecipeByName, getAllRecipes } = require("../controllers/recipeController")
const axios = require("axios");
const Recipe = require("../models/Recipe");


const getRecipesHandler = async (req, res) => {
    const {name} = req.query;//el name se saca de la url, ?name=Juan
    
    const results = name ? await searchRecipeByName(name) : await getAllRecipes();

    res.status(200).json(results);

};



const getDetailHandler = async (req, res) => {

    const {id} = req.params;
    // *****filtrar si es de BDD o API
    const source = isNaN(id) ? "bdd" : "api";
   
    try {

        const recipe = await getRecipeDetail(id, source)
        res.status(200).send(recipe) 
       
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
};

// se hace una prueba con los valores mandados por body en JSON
const createRecipeHandler = async (req, res) =>{
    // los json se sacan de req.body
    const{name, image, summary, healthScore, analyzedInstructions} = req.body
    
    try{
        const newRecipe = await createRecipe(name, image, summary, healthScore, analyzedInstructions);
        res.status(201).json(newRecipe)
    }catch(error){
        
        res.status(400).json({ error: error.message })
    }
};

module.exports ={
    getRecipesHandler,
    getDetailHandler,
    createRecipeHandler
}