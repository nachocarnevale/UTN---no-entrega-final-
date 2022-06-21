-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 21, 2022 at 12:18 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lafdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ganadores`
--

DROP TABLE IF EXISTS `ganadores`;
CREATE TABLE IF NOT EXISTS `ganadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `equipo` varchar(50) NOT NULL,
  `liga` varchar(50) NOT NULL,
  `temporada` varchar(50) NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ganadores`
--

INSERT INTO `ganadores` (`id`, `nombre`, `apellido`, `equipo`, `liga`, `temporada`, `img_id`) VALUES
(30, 'Matias', 'Salcedo', 'Mercedes-Benz', 'B', '3', ''),
(29, 'Abner', 'Oliveira', 'Alpine', 'A', '3', ''),
(28, 'Turko', '.', 'Alfa Romeo', 'B', '2', ''),
(25, 'Abner', 'Oliveira', 'Alpha Tauri ', 'A', '1', ''),
(26, 'Matias', 'Salcedo', 'McLaren', 'B', '1', ''),
(27, 'Abner', 'Oliveira', 'Apline', 'A', '2', '');

-- --------------------------------------------------------

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
CREATE TABLE IF NOT EXISTS `inscripciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `steam` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `nombre`, `apellido`, `email`, `steam`) VALUES
(4, 'Juan Ignacio', 'Carnevale', 'jicarnevale@outlook.com', 'nachoo_carnevale');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'nacho', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'juan', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
