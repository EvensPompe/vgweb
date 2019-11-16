module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "plateforme_has_editDev",{
      nombre_de_plateforme:{
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
