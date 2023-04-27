
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
const createRecipeHandler = (req, res) =>{
    const{name, image, summary, healthScore, analyzedInstructions} = req.body
    // los json se sacan de req.body
    res.status(200).send(`Creando receta:
    name: ${name},
    image: ${image},
    summary: ${summary},
    health score: ${healthScore},
    Step by step Instructions: ${analyzedInstructions}`)
};

module.exports ={
    getRecipesHandler,
    getDetailHandler,
    createRecipeHandler
}