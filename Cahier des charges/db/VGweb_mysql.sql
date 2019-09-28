CREATE DATABASE IF NOT EXISTS `VGWEB` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `VGWEB`;

CREATE TABLE `GENRE` (
  `id_genre` VARCHAR(42),
  `type_genre` VARCHAR(42),
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `APPARTENIR` (
  `id_genre` VARCHAR(42),
  `id_jeu` VARCHAR(42),
  PRIMARY KEY (`id_genre`, `id_jeu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `UTILISATEUR` (
  `id_uti` VARCHAR(42),
  `nom_uti` VARCHAR(42),
  `email_uti` VARCHAR(42),
  `presse` VARCHAR(42),
  `admin` VARCHAR(42),
  PRIMARY KEY (`id_uti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JEU` (
  `id_jeu` VARCHAR(42),
  `nom_jeu` VARCHAR(42),
  `date_de_sortie` VARCHAR(42),
  `synopsis` VARCHAR(42),
  `images` VARCHAR(42),
  `videos` VARCHAR(42),
  `id_editdev` VARCHAR(42),
  PRIMARY KEY (`id_jeu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ACCUEILLIR` (
  `id_jeu` VARCHAR(42),
  `id_plat` VARCHAR(42),
  `nombre_de_jeux` VARCHAR(42),
  PRIMARY KEY (`id_jeu`, `id_plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `PLATEFORME` (
  `id_plat` VARCHAR(42),
  `nom_plat` VARCHAR(42),
  `prix_plat` VARCHAR(42),
  `date_lancement` VARCHAR(42),
  PRIMARY KEY (`id_plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `NOTE` (
  `id_note` VARCHAR(42),
  `note` VARCHAR(42),
  `critique` VARCHAR(42),
  `id_uti` VARCHAR(42),
  `id_jeu` VARCHAR(42),
  PRIMARY KEY (`id_note`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `EDITDEV` (
  `id_editdev` VARCHAR(42),
  `nom_editdev` VARCHAR(42),
  `date_fondation` VARCHAR(42),
  `siege` VARCHAR(42),
  `pays_local` VARCHAR(42),
  `description` VARCHAR(42),
  PRIMARY KEY (`id_editdev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `UTILISER` (
  `id_editdev` VARCHAR(42),
  `id_plat` VARCHAR(42),
  `nombre_de_plateforme` VARCHAR(42),
  PRIMARY KEY (`id_editdev`, `id_plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `APPARTENIR` ADD FOREIGN KEY (`id_jeu`) REFERENCES `JEU` (`id_jeu`);
ALTER TABLE `APPARTENIR` ADD FOREIGN KEY (`id_genre`) REFERENCES `GENRE` (`id_genre`);
ALTER TABLE `JEU` ADD FOREIGN KEY (`id_editdev`) REFERENCES `EDITDEV` (`id_editdev`);
ALTER TABLE `ACCUEILLIR` ADD FOREIGN KEY (`id_plat`) REFERENCES `PLATEFORME` (`id_plat`);
ALTER TABLE `ACCUEILLIR` ADD FOREIGN KEY (`id_jeu`) REFERENCES `JEU` (`id_jeu`);
ALTER TABLE `NOTE` ADD FOREIGN KEY (`id_jeu`) REFERENCES `JEU` (`id_jeu`);
ALTER TABLE `NOTE` ADD FOREIGN KEY (`id_uti`) REFERENCES `UTILISATEUR` (`id_uti`);
ALTER TABLE `UTILISER` ADD FOREIGN KEY (`id_plat`) REFERENCES `PLATEFORME` (`id_plat`);
ALTER TABLE `UTILISER` ADD FOREIGN KEY (`id_editdev`) REFERENCES `EDITDEV` (`id_editdev`);