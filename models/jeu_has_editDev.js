module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "jeu_has_editDev",{
      status:{
          type: Sequelize.DataTypes.BOOLEAN
        }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
