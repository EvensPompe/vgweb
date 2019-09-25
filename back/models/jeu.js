module.exports = (sequelize, Sequelize) => {
  //On définit une table pour les jeux
  return sequelize.define(
    //la table s'appelle "tbl_jeu"
    "tbl_jeu" {

      //id_jeu est la clé primaire de la table
      id_jeu: {
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primarykey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom_jeu: {
        type: Sequelize.DataTypes.STRING
      },
      jour_de_sortie: {
        type: Sequelize.DataTypes.INTEGER
      },
      mois_de_sortie: {
        type: Sequelize.DataTypes.INTEGER
      },
      annee_de_sortie: {
        type: Sequelize.DataTypes.INTEGER
      },
      synopsis: {
        type: Sequelize.DataTypes.STRING
      },
      prix: {
        type: Sequelize.DataTypes.DECIMAL(7, 2)
      },
      images: {
        type: Sequelize.DataTypes.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("images"));
        },
        set: function() {
          return this.setDataValue("images", JSON.stringify(value));
        }
      },
      videos: {
        type: Sequelize.DataTypes.TEXT,
        get: function() {
          return JSON.parse(this.getDataValue("videos"));
        },
        set: function() {
          return this.setDataValue("videos", JSON.stringify(value));
        }
      }
    },{
      timestamps: true,
      underscored: true
    })
}
