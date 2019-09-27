module.exports = (sequelize, Sequelize) => {
  //On définit une table pour les jeux
  return sequelize.define(
    //la table s'appelle "tbl_jeu"
    "tbl_jeu", {

      //id_jeu est la clé primaire de la table
      id_jeu: {
        //On définit le type de la clé en INT(11)
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        //la clé s'auto incrémente
        autoIncrement: true,

      //La clé n'est pas nulle !
        allowNull: false
      },
      nom_jeu: {
        //On définit le type du champ en VARCHAR(255)
        type: Sequelize.DataTypes.STRING
      },
      jour_de_sortie: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.INTEGER
      },
      mois_de_sortie: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.INTEGER
      },
      annee_de_sortie: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.INTEGER
      },
      synopsis: {
        //On définit le type du champ en INT(11)
        type: Sequelize.DataTypes.STRING
      },
      prix: {
        //On définit le type du champ en DECIMAL(7,2)
        type: Sequelize.DataTypes.DECIMAL(7, 2)
      },
      images: {
        //On définit le type du champ en TEXT
        type: Sequelize.DataTypes.TEXT,
        //On crée un getter pour parser le text en JSON
        get: function() {
          return JSON.parse(this.getDataValue("images"));
        },
        //On crée un setter pour convertir le JSON en string
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
      //Ajoute automatiquement un champ created_at et un champ updated_at
      timestamps: true,
      //met automatiquement un attribut
      underscored: true
    })
}
