const { createRecipe } = require("../controllers/recipeController")


const getRecipesHandler = (req, res) => {
    const {name} = req.query;//el name se saca de la url, ?name=Juan
    if(name){
        res.send(`Buscar la receta o las recetas con nombre: ${name}`);
    }else{
        res.status(200).send("Todas las comidas")
    }
};

const getDetailHandler = (req, res) => {
    const {id} = req.params;
    
    res.status(200).send(`una comida por id, el detalle de la comida nro ${id}`)
};

// se hace una prueba con los valores mandados por body en JSON
const createRecipeHandler = async (req, res) =>{
    // los json se sacan de req.body
    
    try{
        const{name, image, summary, healthScore, analyzedInstructions} = req.body
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