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
        //On définit le type du champ en VARCHAR(255)
        type: Sequelize.DataTypes.STRING
      },
      date_de_sortie: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.DATEONLY
      },
      synopsis: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.TEXT
      },
      images: {
        //On définit le type du champ en TEXT
        type: Sequelize.DataTypes.JSON,
        //On crée un getter pour parser le text en JSON
        // get: function() {
        //   return JSON.parse(this.getDataValue("images"));
        // },
        // //On crée un setter pour convertir le JSON en string
        // set: function() {
        //   return this.setDataValue("images", JSON.stringify(value));
        // }
      },
      videos: {
        type: Sequelize.DataTypes.JSON,
        // get: function() {
        //   return JSON.parse(this.getDataValue("videos"));
        // },
        // set: function() {
        //   return this.setDataValue("videos", JSON.stringify(value));
        // }
      }
    },{
      //Ajoute automatiquement un champ created_at et un champ updated_at
      timestamps: true,
      //met automatiquement un attribut
      underscored: true
    })
}
