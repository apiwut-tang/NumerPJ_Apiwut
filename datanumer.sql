-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2020 at 06:55 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datanumer`
--

-- --------------------------------------------------------

--
-- Table structure for table `bisection`
--

CREATE TABLE `bisection` (
  `No` int(11) NOT NULL,
  `Eq` text NOT NULL,
  `menu` varchar(100) NOT NULL,
  `Xl` float NOT NULL,
  `Xr` float NOT NULL,
  `Xm` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bisection`
--

INSERT INTO `bisection` (`No`, `Eq`, `menu`, `Xl`, `Xr`, `Xm`) VALUES
(1, '', 'Secant', 22, 33, 44),
(157, 'x^4-20', 'falsemethod', 0.02, 0.03, 0.025),
(165, '2-e^(x/4)', 'onepoint', 0, 0, 0),
(167, 'x^3-6x-2', 'secantmethod', 2, 3, 0),
(169, 'x^4-13', 'falsemethod', 0.02, 0.03, 0.025),
(185, 'x+3', 'bisection', 1.5, 2, 1.75),
(186, 'x 1', 'bisection', 1.5, 2, 1.75),
(187, 'x 4', 'bisection', 1.5, 2, 1.75),
(188, 'x+2', 'bisection', 1.5, 2, 1.75),
(189, '2e^x-4', 'bisection', 1.5, 2, 1.75),
(190, '2e^x+4', 'bisection', 1.5, 2, 1.75),
(192, 'x+10', 'bisection', 1.5, 2, 1.75),
(193, '2e^x+x-4', 'Newton', 0, 0, 0),
(194, 'x^2-3x-4', 'onepoint', 0, 0, 0),
(198, 'Test', 'bisection', 1.5, 2, 1.75),
(199, 'Test2', 'bisection', 1.5, 2, 1.75),
(200, 'Test3', 'bisection', 1.5, 2, 1.75),
(201, 'x^4-13', 'bisection', 1.5, 2, 1.75);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bisection`
--
ALTER TABLE `bisection`
  ADD PRIMARY KEY (`No`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bisection`
--
ALTER TABLE `bisection`
  MODIFY `No` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
