module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_genre",{
      id_genre:{
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      type_genre:{
        type: Sequelize.DataTypes.ENUM("")
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
