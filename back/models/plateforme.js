module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_plateforme",{
      id:{
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom:{
        type: Sequelize.DataTypes.STRING
      },
      prix:{
        type: Sequelize.DataTypes.DECIMAL(7,2)
      },
      lancement:{
        type: Sequelize.DataTypes.DATEONLY
      },
      type:{
        type: Sequelize.DataTypes.ENUM("Console de salon","Console Portable","Ordinateur")
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
