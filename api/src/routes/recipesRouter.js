const { Router } = require("express");
const { 
    getRecipesHandler,
    getDetailHandler,
    createRecipeHandler} = require("../handlers/recipesHandler");

const recipesRouter = Router();


recipesRouter.get('/',  getRecipesHandler);



recipesRouter.get('/:id', getDetailHandler);


recipesRouter.post('/', createRecipeHandler);

module.exports = recipesRouter;