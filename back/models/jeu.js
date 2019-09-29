module.exports = (sequelize, Sequelize) => {
  //On définit une table pour les jeux
  return sequelize.define(
    //la table s'appelle "tbl_jeu"
    "tbl_jeu", {

      //id_jeu est la clé primaire de la table
      id: {
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom: {
        //On définit le type du champ en STRING
        type: Sequelize.DataTypes.STRING
      },
      sortie: {
        //On définit le type du champ en DATEONLY
        type: Sequelize.DataTypes.DATEONLY
      },
      synopsis: {
        //On définit le type du champ en TEXT
        type: Sequelize.DataTypes.TEXT
      },
      images: {
        //On définit le type du champ en JSON
        type: Sequelize.DataTypes.JSON
      },
      videos: {
        //On définit le type du champ en JSON
        type: Sequelize.DataTypes.JSON
      }
    },{
      //Ajoute automatiquement un champ created_at et un champ updated_at
      timestamps: true,
      //met automatiquement un attribut
      underscored: true
    })
}
