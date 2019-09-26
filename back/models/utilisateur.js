module.exports. = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_utilisateur",{
      id_uti:{
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primarykey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom_uti:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
