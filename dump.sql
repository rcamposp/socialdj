n SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2015 at 03:15 PM
-- Server version: 5.6.25
-- PHP Version: 5.5.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `socialdj`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `votes` int(11) NOT NULL,
  `playerid` text NOT NULL,
  `thumb` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `artist`, `votes`, `playerid`, `thumb`) VALUES
(1, 'Lean On (feat. MØ & DJ Snake)', 'Major Lazer', 1, '95938472', 'http://cdn-images.deezer.com/images/cover/4ab89ee1e4c9f85cb17b12acefd2e8af/250x250-000000-80-0-0.jpg'),
(2, 'Nota de Amor', 'Carlos Vives', 1, '94609844', 'http://cdn-images.deezer.com/images/cover/b225f95c784421cf6ec8b4a6c4f53eca/250x250-000000-80-0-0.jpg'),
(3, 'Sígueme Y Te Sigo', 'Daddy Yankee', 8, '96507494', 'http://cdn-images.deezer.com/images/cover/5cc9de5d7c118050aeecd621459d7442/250x250-000000-80-0-0.jpg'),
(4, 'Prometo Olvidarte', 'Tony Dize', 3, '98135528', 'http://cdn-images.deezer.com/images/cover/3a283900127bdd5652048739ac8d2939/250x250-000000-80-0-0.jpg'),
(5, 'Te Para 3 (MTV Unplugged)', 'Soda Stereo', 2, '4095512', 'http://cdn-images.deezer.com/images/cover/eb34ab659cf334dc57d61c4406358f30/250x250-000000-80-0-0.jpg'),
(6, 'El Doctorado', 'Tony Dize', 9, '15671480', 'http://cdn-images.deezer.com/images/cover/6a2a1b1a61b7e13d0d13bead575c7df9/250x250-000000-80-0-0.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
