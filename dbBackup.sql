/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cars
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cars` (
  `id` varchar(36) NOT NULL,
  `make` varchar(256) DEFAULT NULL,
  `model` varchar(256) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `vin` varchar(17) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `body` varchar(64) DEFAULT NULL,
  `color` varchar(64) DEFAULT NULL,
  `engine` varchar(64) DEFAULT NULL,
  `drive` varchar(64) DEFAULT NULL,
  `cylinders` varchar(64) DEFAULT NULL,
  `transmission` varchar(64) DEFAULT NULL,
  `fuel` varchar(64) DEFAULT NULL,
  `images` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: images
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `images` (
  `id` varchar(36) NOT NULL,
  `type` varchar(3) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `car` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `permissions` varchar(16) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cars
# ------------------------------------------------------------

INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    '0dc55c12-7112-4265-9032-dc376e52bf30',
    'Toyota',
    'Sienna LE',
    '2009',
    '5TDZK23CX9S231176',
    99999999,
    'Old and rusty',
    'Minivan',
    'Green',
    '3.5L V6',
    'Front wheel drive',
    '6',
    'Automatic',
    'Gas',
    '[\"4d90e372-80e2-491a-ac22-13fa5a253c22.jpg\",\"4d90e372-80e2-491a-ac22-13fa5a253c22.jpg\",\"4d90e372-80e2-491a-ac22-13fa5a253c22.jpg\",\"4d90e372-80e2-491a-ac22-13fa5a253c22.jpg\",\"4d90e372-80e2-491a-ac22-13fa5a253c22.jpg\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    '3b0c53a2-9980-425e-9eff-73441bc1478c',
    'Make',
    'Model',
    '200',
    'VIN',
    1000,
    'Description',
    'Body',
    'Color',
    'Engine',
    'Front wheel drive',
    '1',
    'Automatic',
    'Gas',
    '[\"373410da-a87f-472a-ad40-5d0c26b688e7.jpg\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    '6128d1ad-b25b-4ad9-b950-f5c279f7e5f6',
    'Make',
    'Model',
    'Year',
    'VIN',
    100000,
    'Description',
    'Body',
    'Color',
    'Engine',
    'Drive',
    '1',
    'Transmission',
    'Fuel',
    '[\"df8cd0d8-c5dc-49fd-b6eb-5b8a5206290d.jpg\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    '64151914-1dc6-4245-9c27-29da0ca72386',
    't',
    't',
    '0',
    't',
    0,
    '',
    't',
    't',
    't',
    'Front wheel drive',
    '0',
    'Automatic',
    'Gas',
    '[\"5f9ee13f-6a9d-428e-864f-3d2c85e4f9e2jpeg\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    '74a34de0-bcfa-4a22-9d08-d15a3b9b98c3',
    'Ford',
    'Escape SE Sport',
    '2020',
    '5TDZK23CX9S231176',
    1,
    'new and cheap',
    'SUV',
    'Red',
    '2.5L PHEV 4 Cyl',
    'All wheel drive',
    '4',
    'Automatic',
    'Gas',
    '[\"ab2d67ff-11bf-4ab3-a8e2-84d49ded3689.jpg\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    'd4228793-ae62-454b-8377-aba21a11b594',
    'Make',
    'Model',
    'Year',
    'VIN',
    100000,
    'Description',
    'Body',
    'Color',
    'Engine',
    'Drive',
    '1',
    'Transmission',
    'Fuel',
    '[\"a3ee089f-c0f1-4d49-902e-a650468c9c7e.png\"]'
  );
INSERT INTO
  `cars` (
    `id`,
    `make`,
    `model`,
    `year`,
    `vin`,
    `price`,
    `description`,
    `body`,
    `color`,
    `engine`,
    `drive`,
    `cylinders`,
    `transmission`,
    `fuel`,
    `images`
  )
VALUES
  (
    'db654ee8-0c3e-4a58-a1a5-80cd424d239c',
    'Make',
    'Model',
    '2000',
    'VIN',
    0,
    'Description',
    'Body',
    'Color',
    'Engine',
    'Front wheel drive',
    '1',
    'Automatic',
    'Gas',
    '[\"cfa1d8be-2a6c-4b2d-83dc-a8e66281a1cd.jpg\",\"373410da-a87f-472a-ad40-5d0c26b688e7.jpg\"]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: images
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (`id`, `username`, `permissions`, `password`)
VALUES
  (
    'd0052d4f-769e-43a5-a9bf-6e9f3fe0cc96',
    'filip',
    '',
    '{X-PBKDF2}ZYkUdtMKUp3HHNkAxZLKeA==:FqSIkAfrk2q2oNa0G5VxqcZXDRgG9VyU+oWb5gd3wWg=:10000:32'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
