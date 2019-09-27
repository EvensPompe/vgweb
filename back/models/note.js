module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_note",{
      id_note:{
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      note:{
        type: Sequelize.DataTypes.INTEGER
      },
      critique:{
        type: Sequelize.DataTypes.STRING
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
