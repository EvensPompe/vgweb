module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "tbl_jeu" {
      id_jeu: {
        type: Sequelize.DataTypes.INTEGER,
        primarykey: true,
        autoIncrement: true,
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
    })
}
