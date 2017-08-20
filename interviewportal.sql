-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 20, 2017 at 11:09 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `interviewportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `qid` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `answer` varchar(150) NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`qid`, `question`, `option1`, `option2`, `option3`, `option4`, `answer`) VALUES
(2, 'What is the correct JavaScript syntax to change the content of the HTML element below?   <p id="demo">This is a demonstration.</p>', '#demo.innerHTML = "Hello World!";', 'document.getElementByName("p").innerHTML = "Hello World!";', 'document.getElementById("demo").innerHTML = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";', 'option3'),
(3, 'Where is the correct place to insert a JavaScript?', 'The <body> section', 'The <head> section', 'Both the <head> section and the <body> section are correct', 'None', 'option1'),
(4, 'What is the correct syntax for referring to an external script called "xxx.js"?', '<script name="xxx.js">', '<script href="xxx.js">', '<script src="xxx.js">', 'All', 'option3'),
(11, 'Inside which HTML element do we put the JavaScript?', 'script', 'js', 'scripting', 'javascript', 'option1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `token` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `token`, `status`, `score`) VALUES
(1, 'aa@aa.com', 'tok12', 0, 0),
(2, 'rajakash0@gmail.com', 'tok23', 0, 0),
(8, 'rajakash0@gmail.com', '1503234661357', 0, 0),
(13, 'rajakash0@gmail.com', '1503235664232', 1, 1),
(14, 'aavrug@gmail.com', '1503255020004', 1, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
