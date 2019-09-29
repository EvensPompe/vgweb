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
      presse:{
        //Si l'utilisateur vient de la presse ou pas
        type: Sequelize.DataTypes.BOOLEAN
      },
      admin:{
        //Si l'utilisateur est un administrateur ou non
        type: Sequelize.DataTypes.BOOLEAN
      }
    },{
      timestamps:false,
      underscored:true
    }
  )
};
