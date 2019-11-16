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
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      role:{
        //On définit le rôle de l'utilisateur
        type: Sequelize.DataTypes.ENUM("presse","admin","joueur")
      },
      isactive: {
        //On définit le type du champ en BOOLEAN
        type: Sequelize.DataTypes.BOOLEAN
      },
      randomtoken:{
       //On définit le type du champ en TEXT
        type: Sequelize.DataTypes.TEXT
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
