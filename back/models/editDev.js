module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_editDev",{
      id_editDev:{
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
      date:{
        type: Sequelize.DataTypes.DATE
      },
      siege:{
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
