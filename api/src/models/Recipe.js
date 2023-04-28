const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING
    },
    summary: {
      type: DataTypes.TEXT
    },
    healthScore:{
      type: DataTypes.INTEGER
    },
    analyzedInstructions:{
      type: DataTypes.TEXT
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true

    }
    // name, image, summary, healthScore, analyzedInstructions
  }, {timestamps: false});
};
