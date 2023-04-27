const { Recipe } = require("../db");
const axios = require("axios");
require('dotenv').config();
const{ API_KEY} = process.env;


const createRecipe = async (name, image, summary, healthScore, analyzedInstructions) =>
    
    await Recipe.create({name, image, summary, healthScore, analyzedInstructions});   

;

const getRecipeDetail = async (id, source) => {
 
    const dieta = source === "api" 
        ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)).data 
        : await Recipe.findByPk(id);
    return dieta;
};

module.exports = { createRecipe, getRecipeDetail }