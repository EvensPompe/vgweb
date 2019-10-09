module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "jeu_has_plateforme",{
      nombre_de_jeux:{
        type: Sequelize.DataTypes.INTEGER
      },
      status:{
          type: Sequelize.DataTypes.BOOLEAN
        }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
