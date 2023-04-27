const {Router} = require ("express");

const dietsRouter = Router();

dietsRouter.get("/", (req, res) => {
    res.status(200).send("NIY: Las distintas dietas")
});


module.exports = dietsRouter;