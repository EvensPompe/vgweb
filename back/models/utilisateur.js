module.exports = (sequelize, Sequelize) =>{
  return sequelize.define(
    "tbl_utilisateur",{
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
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      role:{
        //On définit le rôle de l'utilisateur
        type: Sequelize.DataTypes.ENUM("presse","admin","joueur")
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
