CREATE DATABASE IF NOT EXISTS `VGWEB` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `VGWEB`;

CREATE TABLE `TBL_GENRE` (
  `id` VARCHAR(42),
  `type` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JEU_HAS_GENRE` (
  `id` VARCHAR(42),
  `id_1` VARCHAR(42),
  PRIMARY KEY (`id`, `id_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TBL_UTILISATEUR` (
  `id` VARCHAR(42),
  `nom` VARCHAR(42),
  `email` VARCHAR(42),
  `role` VARCHAR(42),
  `isactive` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TBL_JEU` (
  `id` VARCHAR(42),
  `nom` VARCHAR(42),
  `sortie` VARCHAR(42),
  `synopsis` VARCHAR(42),
  `images` VARCHAR(42),
  `videos` VARCHAR(42),
  `articles` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JEU_HAS_PLATEFORME` (
  `id` VARCHAR(42),
  `id_1` VARCHAR(42),
  `nombre_de_jeux` VARCHAR(42),
  PRIMARY KEY (`id`, `id_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TBL_PLATEFORME` (
  `id` VARCHAR(42),
  `nom` VARCHAR(42),
  `prix` VARCHAR(42),
  `lancement` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TBL_NOTE` (
  `id` VARCHAR(42),
  `note` VARCHAR(42),
  `critique` VARCHAR(42),
  `id_1` VARCHAR(42),
  `id_2` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `JEU_HAS_EDITDEV` (
  `id` VARCHAR(42),
  `id_1` VARCHAR(42),
  PRIMARY KEY (`id`, `id_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `TBL_EDITDEV` (
  `id` VARCHAR(42),
  `nom` VARCHAR(42),
  `date` VARCHAR(42),
  `siege` VARCHAR(42),
  `pays_local` VARCHAR(42),
  `description` VARCHAR(42),
  `dev` VARCHAR(42),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `PLATEFORME_HAS_EDITDEV` (
  `id` VARCHAR(42),
  `id_1` VARCHAR(42),
  `nombre_de_plateforme` VARCHAR(42),
  PRIMARY KEY (`id`, `id_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `JEU_HAS_GENRE` ADD FOREIGN KEY (`id_1`) REFERENCES `TBL_JEU` (`id`);
ALTER TABLE `JEU_HAS_GENRE` ADD FOREIGN KEY (`id`) REFERENCES `TBL_GENRE` (`id`);
ALTER TABLE `JEU_HAS_PLATEFORME` ADD FOREIGN KEY (`id_1`) REFERENCES `TBL_PLATEFORME` (`id`);
ALTER TABLE `JEU_HAS_PLATEFORME` ADD FOREIGN KEY (`id`) REFERENCES `TBL_JEU` (`id`);
ALTER TABLE `TBL_NOTE` ADD FOREIGN KEY (`id_2`) REFERENCES `TBL_JEU` (`id`);
ALTER TABLE `TBL_NOTE` ADD FOREIGN KEY (`id_1`) REFERENCES `TBL_UTILISATEUR` (`id`);
ALTER TABLE `JEU_HAS_EDITDEV` ADD FOREIGN KEY (`id_1`) REFERENCES `TBL_JEU` (`id`);
ALTER TABLE `JEU_HAS_EDITDEV` ADD FOREIGN KEY (`id`) REFERENCES `TBL_EDITDEV` (`id`);
ALTER TABLE `PLATEFORME_HAS_EDITDEV` ADD FOREIGN KEY (`id_1`) REFERENCES `TBL_PLATEFORME` (`id`);
ALTER TABLE `PLATEFORME_HAS_EDITDEV` ADD FOREIGN KEY (`id`) REFERENCES `TBL_EDITDEV` (`id`);