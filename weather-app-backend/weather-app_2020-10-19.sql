# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19)
# Database: weather-app
# Generation Time: 2020-10-19 01:28:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table CITY_WEATHER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CITY_WEATHER`;

CREATE TABLE `CITY_WEATHER` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cityName` varchar(20) DEFAULT NULL,
  `weather` varchar(20) DEFAULT NULL,
  `temp` int(11) DEFAULT NULL,
  `minTemp` int(11) DEFAULT NULL,
  `maxTemp` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `CITY_WEATHER` WRITE;
/*!40000 ALTER TABLE `CITY_WEATHER` DISABLE KEYS */;

INSERT INTO `CITY_WEATHER` (`id`, `cityName`, `weather`, `temp`, `minTemp`, `maxTemp`)
VALUES
	(1,'Sydney','sunny',25,22,27),
	(2,'Melbourne','rain',18,17,22),
	(3,'Brisbane','snow',12,-1,12),
	(4,'Wuhan','thunderStorm',19,19,24);

/*!40000 ALTER TABLE `CITY_WEATHER` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
