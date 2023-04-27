const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.get('/', (req, res) => {
    res.status(200).send("OK")
});
mainRouter.get('/food', (req, res) => {
    res.status(200).send("aca esta tu comida ")
});
mainRouter.get('/food/:id', (req, res) => {
    res.status(200).send("una comida por id")
  });
  
mainRouter.post('/food', (req, res) => {
    res.status(200).send('Una receta creadas')
})
  

module.exports = mainRouter;
