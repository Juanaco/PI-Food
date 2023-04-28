const { Recipe } = require("../db");
const axios = require("axios");
require('dotenv').config();
const{ API_KEY} = process.env;


const searchRecipeByName = async (name) => {
    const databaseRecipes = await Recipe.findAll({ where:{ name } });
// TIENE QUE HABER UNA BUSQUEDA INEXACTA, QUE SE BUSQUE CON SOLO UNA PALABRA. ESTO BUSCA SÓLO CON EL NOMBRE ENTERO
    const apiRecipesRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
        ).data.results;

    const apiRecipes = cleanArray(apiRecipesRaw);

    const filteredApi = apiRecipes.filter((recipe) => recipe.name === name);

    return [...filteredApi, ...databaseRecipes]
};


// -----------HELPER O UTILS, ESTO FILTRA LO TRAIDO DE LA API PARA MATCHEAR MI BDD Y QUEDARME SÓLO DATOS QUE QUIERO
const cleanArray = (arr)=>{
    const clean = arr.map((elem) =>{
        return{
            id: elem.id,
            name: elem.title,
            image: elem.image,
            summary: elem.summary,
            healthScore: elem.healthScore,
            //HAY QUE RECORRER LAS INSTRUCCIONES "analyzedInstructions" Y TRAER LAS PROPIEDADES NUMERO Y PASOS
            analyzedInstructions: elem.analyzedInstructions,
            created: false
        }
    });
    return clean;
};

// *********TRAE TODAS LAS RECETAS *********** 
const getAllRecipes = async () =>{
    const databaseRecipes = await Recipe.findAll();

    const apiRecipesRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
        ).data.results;


    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return [...databaseRecipes, ...apiRecipes];
};


const createRecipe = async (name, image, summary, healthScore, analyzedInstructions) =>
    
    await Recipe.create({name, image, summary, healthScore, analyzedInstructions});   

;
// ********CONTROLLER NO DEBERÍA COMUNICARSE CON LA BDD NI LA API----QUIÉN?*****************************
const getRecipeDetail = async (id, source) => {
 
    const dieta = source === "api" 
        ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)).data 
        : await Recipe.findByPk(id);
    return dieta;
};

module.exports = { createRecipe, getRecipeDetail, searchRecipeByName, getAllRecipes}