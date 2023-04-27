const { Recipe } = require("../db");

const createRecipe = async (name, image, summary, healthScore, analyzedInstructions) =>
    
    await Recipe.create({name, image, summary, healthScore, analyzedInstructions});
;

module.exports = { createRecipe }