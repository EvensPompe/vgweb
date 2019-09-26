module.exports. = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_editDev",{
      id_editDev:{
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primarykey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom_editDev:{
        type: Sequelize.DataTypes.STRING
      },
      date_editDev:{
        type: Sequelize.DataTypes.DATE
      },
      siege_social:{
        type: Sequelize.DataTypes.STRING
      },
      description:{
        type: Sequelize.DataTypes.STRING
      }
    },{
      timestamps:true,
      underscored:true
    }
  )
};
