-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2020 at 05:38 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticketapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `apilogs`
--

CREATE TABLE `apilogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `deployment_id` varchar(20) COLLATE latin1_general_ci DEFAULT NULL,
  `company_id` varchar(250) COLLATE latin1_general_ci NOT NULL,
  `servicecode` varchar(16) COLLATE latin1_general_ci NOT NULL,
  `count` int(11) NOT NULL DEFAULT 1,
  `statuscode` varchar(4) COLLATE latin1_general_ci NOT NULL DEFAULT '00',
  `ip` varchar(250) COLLATE latin1_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `apilogs`
--

INSERT INTO `apilogs` (`id`, `transaction_id`, `deployment_id`, `company_id`, `servicecode`, `count`, `statuscode`, `ip`, `created_at`, `status`) VALUES
(2153205, 12, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-12-01 12:15:22', 1),
(2201600, 0, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:33:10', 1),
(7872818, 7, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:39:49', 1),
(8386154, 11, '5f99975bb1580', '5f3e730721ece', 'BVN', 1, '0', '::1', '2020-12-01 08:01:15', 1),
(11241819, 0, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:37:21', 1),
(24185517, 0, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:35:10', 1),
(24474435, 6, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:38:19', 1),
(32962749, 0, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:33:33', 1),
(46884245, 0, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:37:13', 1),
(57851649, 10, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-12-01 07:46:15', 1),
(66149258, 8, '5f99975bb1580', '5f3e730721ece', 'FUND', 1, '0', '::1', '2020-11-30 16:41:12', 1),
(85497562, 9, '5f99975bb1580', '5f3e730721ece', 'CAV', 1, '0', '::1', '2020-12-01 07:41:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `user_id` varchar(20) NOT NULL,
  `businessname` varchar(200) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(125) NOT NULL,
  `address` tinytext NOT NULL,
  `country_id` varchar(20) NOT NULL,
  `state_id` varchar(20) NOT NULL,
  `lga` varchar(200) NOT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT ' 1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`user_id`, `businessname`, `telephone`, `email`, `address`, `country_id`, `state_id`, `lga`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f3e930330e28', 'Obejor Global Services', '', '', '', '', '', '', '2020-08-31 16:34:46', '2020-08-31 16:34:46', 'OPEN', 1),
('5f44f8c01d37e', 'Obejor Global Services', '908734521234', 'obejor@gmail.com', 'Somewhere around Ikeja', '1', '3', 'Ikeja', '2020-08-30 11:31:17', '2020-09-15 14:45:48', 'OPEN', 1),
('5f4b8bf8b2bb2', 'Miratechnologies', '', '', '', '', '', '', '2020-08-30 12:22:32', '2020-08-30 12:22:32', 'OPEN', 1),
('5f4d1882183b1', 'Miratechnologies', '', '', '', '', '', '', '2020-08-31 16:34:26', '2020-08-31 16:34:26', 'OPEN', 1),
('5f50883aae094', 'Some weird business', '8182884545', 'companycom@gmail.com', 'somewhere in ikorodu', '1sfsyuhfi4jk322ui2', '26nuui2huhui232hui', 'Ikorodu', '2020-09-03 07:30:13', '2020-09-03 07:30:13', 'OPEN', 1),
('5f508fad22326', 'Whatever Inc', '9089786756', 'info@whatever.com', 'Somewhere in lekki', '43i4u3u43u3i3u5', '24242u323222j3', 'lekki', '2020-09-03 07:39:41', '2020-09-15 16:37:13', 'OPEN', 0),
('5f55e1285df33', 'Another inc.', '778788777777745', 'inc@mail.com', 'Somewhere around town', '1', '5', 'Mushin', '2020-09-07 08:28:40', '2020-09-22 16:59:48', 'OPEN', 1),
('5f5f750835723', 'ggfgdghd', '8283474348832', 'fdgf@gmail.com', 'gvhsadjklflsfgfkg', 'Nigeria', 'Lagos', 'Alimosho', '2020-09-14 14:50:00', '2020-09-15 11:30:08', 'OPEN', 0),
('5f69d64840860', 'Business', '6278238723', 'gsghsag@HHSH.J.JK', 'undefined', '1', '5', 'undefined', '2020-09-22 11:47:36', '2020-09-22 12:52:31', 'OPEN', 1),
('5f96b2bfac160', 'Sleek Fit', '43789359435', 'admin@sleekfit.com', 'Somewhere around auchi', '1', '1', 'Auchi', '2020-10-26 11:27:59', '2020-10-26 11:27:59', 'OPEN', 1),
('5f96b33a54932', 'Sleek Fit', '43789359435655', 'admin@sleekfit.com.ng', 'Somewhere around auchi', '1', '1', 'Auchi', '2020-10-26 11:30:02', '2020-10-26 11:30:02', 'OPEN', 1),
('5f999703bddd3', 'Ibile Microfinance Bank', '908756656656', 'test@gmail.com', 'Somewhere around Lagos', '1', '24', 'Alimosho', '2020-10-28 16:06:27', '2020-12-01 05:53:03', 'OPEN', 1),
('5fb64b85e831b', 'Sleek Fit', '8045267738', 'info@sleekfit.com', 'Somewhere around Lokoja', '1', '21', 'Lokoja', '2020-11-19 10:40:05', '2020-11-19 10:40:05', 'OPEN', 1),
('5fb64c1da674f', 'LollyBella', '8045267738', 'business@gmail.com', 'Somewhere around Lokoja', '1', '21', 'Lokoja', '2020-11-19 10:42:37', '2020-11-19 10:42:37', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clientusers`
--

CREATE TABLE `clientusers` (
  `user_id` varchar(20) NOT NULL,
  `clientuser_id` varchar(20) NOT NULL,
  `hfield` varchar(255) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `address` varchar(200) NOT NULL,
  `apikey` varchar(200) NOT NULL,
  `apppackage_id` tinyint(2) NOT NULL DEFAULT 1,
  `logourl` varchar(200) DEFAULT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `email`, `telephone`, `address`, `apikey`, `apppackage_id`, `logourl`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f3e730721ece', 'Dominic Olajire', 'lerryjay45@gmail.com', '8182883452', '', '97899c-7d0420-1273f0-901d29-84e2f8', 1, NULL, '2020-08-20 14:56:39', '2020-08-20 12:56:40', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `country_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `currency_code` varchar(4) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLLSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`country_id`, `name`, `currency_code`, `status`) VALUES
(1, 'Nigeria', 'NGN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `deployments`
--

CREATE TABLE `deployments` (
  `id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `product_id` varchar(20) NOT NULL,
  `modules` mediumtext NOT NULL,
  `remarks` mediumtext DEFAULT NULL,
  `paymentstatus` enum('pending','completed','incompelete') NOT NULL DEFAULT 'pending',
  `paymentdate` date NOT NULL,
  `deploymentstatus` enum('pending','ongoing','complete','incomplete') NOT NULL,
  `deploymentdate` date NOT NULL,
  `trainingstatus` enum('pending','ongoing','complete','incomplete') NOT NULL,
  `trainingdate` date NOT NULL,
  `files` mediumtext DEFAULT NULL,
  `licenseduration` enum('weekly','monthly','annual','bi-annual','indefinite') NOT NULL DEFAULT 'annual',
  `expirydate` date NOT NULL,
  `cost` double NOT NULL DEFAULT 0,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 =CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deployments`
--

INSERT INTO `deployments` (`id`, `user_id`, `product_id`, `modules`, `remarks`, `paymentstatus`, `paymentdate`, `deploymentstatus`, `deploymentdate`, `trainingstatus`, `trainingdate`, `files`, `licenseduration`, `expirydate`, `cost`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f4ba27a0dac0', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b98b760fb3', '', 'pending', '0000-00-00', 'pending', '0000-00-00', 'pending', '0000-00-00', '', 'annual', '0000-00-00', 50000, '2020-08-30 13:58:34', '2020-09-24 11:33:54', 'OPEN', 0),
('5f55e4af98c3a', '5f55e1285df33', '5f45103da7715', '5f4e76fa92943,5f57366c08ec5', '', 'pending', '0000-00-00', 'pending', '0000-00-00', 'pending', '0000-00-00', '/public/deployment/5f6878efc0e23Accsiss.png', 'annual', '0000-11-30', 5000, '2020-09-07 08:43:43', '2020-09-24 11:48:59', 'OPEN', 0),
('5f55e52937510', '5f55e1285df33', '5f44e90983ff1', '5f4b98b760fb3,5f4b985c0a26b,', '', 'pending', '0000-00-00', 'pending', '0000-00-00', 'pending', '0000-00-00', '', 'annual', '0000-00-00', 25000, '2020-09-07 08:45:45', '2020-09-14 17:04:19', 'OPEN', 0),
('5f5ade4e5687f', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', '', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', '', 'annual', '2021-09-25', 50000, '2020-09-11 03:17:50', '2020-09-24 11:12:40', 'OPEN', 0),
('5f5ae157a1344', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', '', 'annual', '2021-09-25', 50000, '2020-09-11 03:30:47', '2020-09-24 11:38:36', 'OPEN', 0),
('5f5ae2111fabf', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', 'Array', 'annual', '2021-09-25', 50000, '2020-09-11 03:33:53', '2020-09-24 11:37:13', 'OPEN', 0),
('5f5ae2327c5de', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', 'Array', 'annual', '2021-09-25', 50000, '2020-09-11 03:34:26', '2020-09-24 11:36:05', 'OPEN', 0),
('5f5ae264e5810', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', '[\"\\/public\\/deployment\\/5f5ae264e5749Fela music\",\"\\/public\\/deployment\\/5f5ae264e579bionic error fixes.txt\",\"\\/public\\/deployment\\/5f5ae264e57bfProject management.txt\"]', 'annual', '2021-09-25', 50000, '2020-09-11 03:35:16', '2020-09-24 11:12:27', 'OPEN', 0),
('5f5ae29829518', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', '/public/deployment/5f5ae29829458Fela music,/public/deployment/5f5ae298294a9ionic error fixes.txt,/public/deployment/5f5ae298294d2Project management.txt', 'annual', '2021-09-25', 50000, '2020-09-11 03:36:08', '2020-09-24 11:39:38', 'OPEN', 0),
('5f5ae30870113', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4b9877544fb,5f4b98b760fb3', 'We have to begin training immediately payment is complete', 'pending', '2020-09-20', 'pending', '2020-09-25', 'pending', '2020-09-21', '/public/deployment/5f5ae3087008cFela music,/public/deployment/5f5ae308700ccionic error fixes.txt,/public/deployment/5f5ae308700e3Project management.txt', 'annual', '2021-09-25', 50000, '2020-09-11 03:38:00', '2020-09-24 11:42:55', 'OPEN', 0),
('5f5b625d2bc89', '5f44f8c01d37e', '5f44e90983ff1', '5f4b985c0a26b,5f4b98b760fb3,5f4ce2ae68382,', 'We have to begin training immediately payment is complete\r\n', 'pending', '2020-09-11', 'pending', '2020-09-14', 'pending', '2020-09-14', NULL, 'annual', '2021-09-14', 5000, '2020-09-11 12:41:17', '2020-09-11 13:54:53', 'OPEN', 0),
('5f5f983215f0f', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', 'Remark', 'pending', '2020-09-15', 'pending', '2020-09-23', 'pending', '2020-09-15', NULL, 'annual', '2021-09-23', 5000, '2020-09-14 17:20:02', '2020-09-24 11:31:38', 'OPEN', 0),
('5f6078cdb3b11', '5f44f8c01d37e', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', 'Remark is empty', 'pending', '2020-09-15', 'pending', '2020-09-16', 'pending', '2020-09-17', '/public/deployment/5f609bb21dce330-days-of-react-ebook-fullstackio.pdf,/public/deployment/5f84669310e21forbidden.jpg', 'annual', '2021-09-16', 50000, '2020-09-15 09:18:21', '2020-10-12 15:22:11', 'OPEN', 1),
('5f607f725aadf', '5f44f8c01d37e', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', 'Remark is empty', 'pending', '2020-09-15', 'pending', '2020-09-16', 'pending', '2020-09-16', NULL, 'monthly', '2020-10-16', 5000, '2020-09-15 09:46:42', '2020-09-24 12:19:19', 'OPEN', 0),
('5f60812a85d06', '5f44f8c01d37e', '5f44e90983ff1', '5f4b985c0a26b', 'Remark is empty', 'pending', '2020-09-15', 'pending', '2020-09-16', 'pending', '2020-09-16', '', 'monthly', '2020-10-16', 4000, '2020-09-15 09:54:02', '2020-09-15 09:54:02', 'OPEN', 1),
('5f6081c70ffa0', '5f44f8c01d37e', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', 'Remark is empty', 'pending', '2020-09-24', 'pending', '2020-09-09', 'pending', '2020-09-17', '/public/deployment/5f608ba529f94Accsiss - Copy.png,/public/deployment/5f8d8310aba83mira - Copy.png', 'monthly', '2020-10-09', 4000, '2020-09-15 09:56:39', '2020-10-19 13:14:08', 'OPEN', 1),
('5f686bd3ecf15', '5f50883aae094', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', 'Remark is empty', 'pending', '2020-09-01', 'pending', '2020-09-16', 'ongoing', '2020-09-09', '/public/deployment/5f686bd3ead67Accsiss.png', 'monthly', '2020-10-16', 5000, '2020-09-21 10:01:08', '2020-09-24 11:47:01', 'OPEN', 0),
('5f686bf10d10b', '5f50883aae094', '5f44e90983ff1', '5f4ce2ae68382', 'Remark is empty', 'pending', '2020-09-01', 'pending', '2020-09-16', 'ongoing', '2020-09-09', '', 'monthly', '2020-10-16', 5000, '2020-09-21 10:01:37', '2020-09-24 11:46:01', 'OPEN', 0),
('5f686c9c7a2b6', '5f50883aae094', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', 'Remark is blank', 'pending', '2020-09-15', 'pending', '2020-09-16', 'pending', '2020-09-09', '/public/deployment/5f74645c1afe730-days-of-react-ebook-fullstackio.pdf', 'monthly', '2020-10-16', 80000, '2020-09-21 10:04:28', '2020-09-30 12:18:52', 'OPEN', 0),
('5f686d675a218', '5f55e1285df33', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '2020-09-22', 'pending', '2020-09-16', 'pending', '1970-01-01', '', 'annual', '2021-09-16', 6000, '2020-09-21 10:07:51', '2020-09-24 12:48:49', 'OPEN', 0),
('5f686db07846a', '5f50883aae094', '5f5f85fed72d5', '5f5f8bd6a58b9', '', '', '2020-09-15', 'pending', '2020-09-23', 'pending', '2020-09-09', '', '', '2021-09-23', 98000, '2020-09-21 10:09:04', '2020-09-24 11:29:04', 'OPEN', 0),
('5f686dd9c939c', '5f50883aae094', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '/public/deployment/5f686dd9c34ddAccsiss - Copy.png', '', '1971-01-01', 500, '2020-09-21 10:09:45', '2020-09-24 11:30:17', 'OPEN', 0),
('5f6c7c2b16239', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 11:59:55', '2020-09-24 12:02:58', 'OPEN', 0),
('5f6c7d281eed9', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:04:08', '2020-09-24 12:07:24', 'OPEN', 0),
('5f6c7d4e52613', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:04:46', '2020-09-24 12:09:51', 'OPEN', 0),
('5f6c7eeed89d4', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:11:42', '2020-09-24 12:11:51', 'OPEN', 0),
('5f6c7f40ea621', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:13:04', '2020-09-24 12:13:10', 'OPEN', 0),
('5f6c7f96c3f87', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:14:30', '2020-09-24 12:14:37', 'OPEN', 0),
('5f6c831d4371e', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:29:33', '2020-09-24 12:30:19', 'OPEN', 0),
('5f6c8344a437f', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:30:12', '2020-09-24 12:44:45', 'OPEN', 0),
('5f6c84db8eefa', '5f69d64840860', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:36:59', '2020-09-24 12:37:08', 'OPEN', 0),
('5f6c86d90af67', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:45:29', '2020-09-24 12:46:24', 'OPEN', 0),
('5f6c8726f1508', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f6881aa94720', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:46:46', '2020-09-24 12:47:10', 'OPEN', 0),
('5f6c875b270c6', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 12:47:39', '2020-09-24 12:48:02', 'OPEN', 0),
('5f6c8a4c78cc0', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 13:00:12', '2020-09-24 13:00:23', 'OPEN', 0),
('5f6c8a6daa5c8', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f6881aa94720,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 13:00:45', '2020-09-24 13:00:58', 'OPEN', 0),
('5f6c8a7655b25', '5f4b8bf8b2bb2', '5f5f85fed72d5', '5f6b4d1500617', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-24 13:00:54', '2020-09-24 13:01:11', 'OPEN', 0),
('5f6c8a8eb1d43', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '/public/deployment/5f6cbc1c6294b30-days-of-react-ebook-fullstackio.pdf,/public/deployment/5f6dfe4dcc6a2accsissp - Copy.png,/public/deployment/5f6e0f8a1633fAccsiss.png', 'annual', '1971-01-01', 0, '2020-09-24 13:01:18', '2020-09-30 12:05:03', 'OPEN', 0),
('5f6dffc54de02', '5f55e1285df33', '5f44e90983ff1', '5f4b985c0a26b,5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 300, '2020-09-25 15:33:41', '2020-09-25 15:33:41', 'OPEN', 1),
('5f6dffd7c7b2b', '5f508fad22326', '5f5f85fed72d5', '5f69f74343fd2', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '/public/deployment/5f74641dcd9adforbidden2.png', 'annual', '1971-01-01', 7000, '2020-09-25 15:33:59', '2020-11-19 16:16:00', 'OPEN', 1),
('5f6dffe32413a', '5f55e1285df33', '5f609d146838f', '5f68a13b8f691', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 900, '2020-09-25 15:34:11', '2020-09-25 15:34:11', 'OPEN', 1),
('5f7466c5272da', '5f4b8bf8b2bb2', '5f44e90983ff1', '5f4b985c0a26b', '', 'pending', '1970-01-01', 'pending', '1970-01-19', 'pending', '1967-01-25', '/public/deployment/5f7db7c65dd13payment.png,/public/deployment/5f805eb5855f130-days-of-react-ebook-fullstackio.pdf,/public/deployment/5f805eb585b49404_not_found.png,/public/deployment/5f805eb585f8fAccsiss - Copy.png,/public/deployment/5f805eb5863b5Accsiss.png,/public/deployment/5f805eb5867e0accsissp - Copy.png,/public/deployment/5f805eb586c41accsissp.png', 'annual', '1971-01-19', 0, '2020-09-30 12:06:45', '2020-10-27 12:56:14', 'OPEN', 1),
('5f746701718b3', '5f50883aae094', '5f44e90983ff1', '5f6881aa94720', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:07:45', '2020-09-30 12:07:49', 'OPEN', 0),
('5f746740a7665', '5f508fad22326', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:08:48', '2020-11-19 16:14:56', 'OPEN', 0),
('5f74685938d8c', '5f50883aae094', '5f5f85fed72d5', '5f69f74343fd2', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:13:29', '2020-09-30 12:13:36', 'OPEN', 0),
('5f746869b77b8', '5f50883aae094', '5f44e90983ff1', '5f6881aa94720', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:13:45', '2020-09-30 12:13:50', 'OPEN', 0),
('5f7468ec238ba', '5f50883aae094', '5f44e90983ff1', '5f6881aa94720', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:15:56', '2020-09-30 12:15:59', 'OPEN', 0),
('5f74692dbeb77', '5f50883aae094', '5f44e90983ff1', '5f6881aa94720', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:17:01', '2020-09-30 12:17:05', 'OPEN', 0),
('5f7469533fa64', '5f50883aae094', '5f5f85fed72d5', '5f6b4d1500617', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:17:39', '2020-09-30 12:17:42', 'OPEN', 0),
('5f7469bbde279', '5f50883aae094', '5f44e90983ff1', '5f4ce2ae68382', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:19:23', '2020-09-30 12:20:54', 'OPEN', 0),
('5f7469c979ed2', '5f50883aae094', '5f609d146838f', '5f68a13b8f691', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:19:37', '2020-09-30 12:19:55', 'OPEN', 0),
('5f746b3f4b9c4', '5f44f8c01d37e', '5f5f85fed72d5', '5f69f74343fd2', '', 'pending', '1970-01-01', 'pending', '1970-01-01', 'pending', '1970-01-01', '', 'annual', '1971-01-01', 0, '2020-09-30 12:25:51', '2020-09-30 12:25:51', 'OPEN', 1),
('5f980ebfc10c7', '5f4b8bf8b2bb2', '5f609d146838f', '5f68a13b8f691', '', 'pending', '2020-10-07', 'ongoing', '2020-09-28', 'pending', '2020-10-05', '', '', '2021-09-28', 0, '2020-10-27 12:12:47', '2020-10-27 12:12:47', 'OPEN', 1),
('5f99975bb1580', '5f999703bddd3', '5f609d146838f', '5f68a13b8f691', 'Remark is empty', 'completed', '2020-10-28', '', '2020-10-28', 'ongoing', '2020-10-28', '', 'monthly', '2020-11-28', 250, '2020-10-28 16:07:55', '2020-10-28 16:07:55', 'OPEN', 1),
('5fb64c503d402', '5f3e930330e28', '5f5f85fed72d5', '5f69f74343fd2', '', '', '2020-11-10', 'pending', '2020-11-04', 'pending', '2020-11-12', '', 'weekly', '2020-11-11', 300000, '2020-11-19 10:43:28', '2020-11-19 16:05:37', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productmodules`
--

CREATE TABLE `productmodules` (
  `id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` mediumtext NOT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productmodules`
--

INSERT INTO `productmodules` (`id`, `product_id`, `name`, `description`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f4b985c0a26b', '5f44e90983ff1', 'Access Control', 'Enables user to have different roles and  permissions', '2020-08-30 14:15:24', '2020-09-14 15:17:45', 'OPEN', 1),
('5f4b9877544fb', '5f44e90983ff1', 'Payroll', 'Staff payroll system', '2020-08-30 14:15:51', '2020-09-03 13:57:33', 'OPEN', 0),
('5f4b98b760fb3', '5f44e90983ff1', 'Payroll and Employee Management', 'User Payroll and employee system', '2020-08-30 14:16:55', '2020-09-14 15:18:04', 'OPEN', 0),
('5f4ce2ae68382', '5f44e90983ff1', 'Customer Relationship Management', 'Customer realtionship management', '2020-08-31 13:44:46', '2020-09-10 21:34:32', 'OPEN', 1),
('5f4e76fa92943', '5f45103da7715', 'Role Based Administration', 'Enables user to have different roles and  permissions', '2020-09-01 18:29:46', '2020-09-02 11:04:55', 'OPEN', 1),
('5f57366c08ec5', '5f45103da7715', 'Payroll', 'User and personal management', '2020-09-08 09:44:44', '2020-09-08 07:44:44', 'OPEN', 1),
('5f5f89f14e3e7', '5f44e90983ff1', 'ghtfyhy', 'hfjhjhkg', '2020-09-14 17:19:13', '2020-09-14 15:19:27', 'OPEN', 0),
('5f5f8a3f7700e', '5f44e90983ff1', 'jgj', 'jkjk', '2020-09-14 17:20:31', '2020-09-14 15:20:40', 'OPEN', 0),
('5f5f8a71dc5bc', '5f44e90983ff1', 'deffsd', 'fsdfvf', '2020-09-14 17:21:21', '2020-09-14 15:21:29', 'OPEN', 0),
('5f5f8aa655057', '5f44e90983ff1', 'gfrtgr', 'rgtdg', '2020-09-14 17:22:14', '2020-09-14 15:22:22', 'OPEN', 0),
('5f5f8aecd08d1', '5f44e90983ff1', 'ghg', 'fjhjghj', '2020-09-14 17:23:24', '2020-09-14 15:23:32', 'OPEN', 0),
('5f5f8bd6a58b9', '5f5f85fed72d5', 'jjhk,', 'dfvgfdg', '2020-09-14 17:27:18', '2020-09-21 12:51:57', 'OPEN', 0),
('5f5f9196aaea2', '5f44e90983ff1', 'ghgfh', 'hfgjnghj', '2020-09-14 17:51:50', '2020-09-14 15:51:59', 'OPEN', 0),
('5f6881aa94720', '5f44e90983ff1', 'dgfhfh222', 'fghgfh', '2020-09-21 12:34:18', '2020-09-23 13:24:35', 'OPEN', 1),
('5f68a13b8f691', '5f609d146838f', 'dfgfdg', 'vcbc', '2020-09-21 14:48:59', '2020-09-21 12:48:59', 'OPEN', 1),
('5f68a23faf1e5', '5f45103da7715', 'gdffh', 'gfhgfjg', '2020-09-21 14:53:19', '2020-09-21 12:53:23', 'OPEN', 0),
('5f69f74343fd2', '5f5f85fed72d5', 'Savings', 'Savings', '2020-09-22 15:08:19', '2020-09-22 13:08:19', 'OPEN', 1),
('5f6b4d1500617', '5f5f85fed72d5', '111', 'fdgf', '2020-09-23 15:26:45', '2020-09-23 13:26:45', 'OPEN', 1),
('5f7da94ca3be3', '5f44e90983ff1', 'Accsiss eBs is an accounting software, designed to run in multiple locations across different states, nations and continents, with complex network and diverse platforms', 'Accsiss eBs is an accounting software, designed to run in multiple locations across different states, nations and continents, with complex network and diverse platforms', '2020-10-07 13:41:00', '2020-10-07 11:41:00', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(50) NOT NULL,
  `company_id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` tinytext NOT NULL,
  `imageurl` varchar(200) NOT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `company_id`, `name`, `description`, `imageurl`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f44e90983ff1', '5f3e730721ece', 'Accsiss eBs', 'Accsiss eBs is an accounting software, designed to run in multiple locations across different states, nations and continents, with complex network and diverse platforms. This version combines the functionalities of the small business version and more.\r\nAc', '/public/product/5f6b1e803adacAccsiss - Copy.png', '2020-08-25 12:33:45', '2020-09-29 13:23:27', 'OPEN', 1),
('5f45103da7715', '5f3e730721ece', 'Accissebs', 'Acciss ebs is a powerful sales software', '/public/product/5f6b1e025d8e8accsissp - Copy.png', '2020-08-25 15:21:01', '2020-09-23 10:08:08', 'OPEN', 0),
('5f50f8e4c3085', '5f3e730721ece', 'AccissHbs', 'Acciss ebs is a powerful sales software', '', '2020-09-03 16:08:36', '2020-09-15 11:32:03', 'OPEN', 0),
('5f55eec910ae0', '5f3e730721ece', 'product name ', 'Test product description', '', '2020-09-07 10:26:49', '2020-09-07 08:36:41', 'OPEN', 0),
('5f55ef2b9f65c', '5f3e730721ece', 'Test product', 'Product description', '', '2020-09-07 10:28:27', '2020-09-07 08:36:38', 'OPEN', 0),
('5f55efae27f40', '5f3e730721ece', 'Test product', 'Test description', '/public/product/5f55efae27e49itunes-50.jpg', '2020-09-07 10:30:38', '2020-09-07 08:35:40', 'OPEN', 0),
('5f5f859a1ce09', '5f3e730721ece', 'Mira HPro', 'Mira HPro is an Enterprise Hospital Management System (EHMS). It is a web application that can run across multiple platforms. The System is designed to provide the best user experience and also provide the hospital with the capability to manage out-patien', '/public/product/5f5f859a1c6f9mira.png', '2020-09-14 17:00:42', '2020-09-14 15:10:55', 'OPEN', 0),
('5f5f85fed72d5', '5f3e730721ece', 'Mira HPro', 'Mira HPro is an Enterprise Hospital Management System (EHMS). It is a web application that can run across multiple platforms. The System is designed to provide the best user experience and also provide the hospital with the capability to manage out-patien', '/public/product/5f5f85fed69f6mira.png', '2020-09-14 17:02:22', '2020-09-14 15:02:22', 'OPEN', 1),
('5f5f86c1da2bd', '5f3e730721ece', 'aaaaa', 'jhkfk', '/public/product/5f5f86c1d9becaccsissp - Copy.png', '2020-09-14 17:05:37', '2020-09-14 15:07:00', 'OPEN', 0),
('5f5f8876f1617', '5f3e730721ece', 'fdgfg', 'gfhgh', '/public/product/5f5f8876f1076Accsiss - Copy.png', '2020-09-14 17:12:54', '2020-09-14 15:13:08', 'OPEN', 0),
('5f5f88d3af10c', '5f3e730721ece', 'fgfdg', 'fgdgh', '/public/product/5f5f88d3aeb4fmira - Copy.png', '2020-09-14 17:14:27', '2020-09-14 15:14:34', 'OPEN', 0),
('5f609d146838f', '5f3e730721ece', 'Sysbanker EE', 'Sysbanker EE is the web version of our micro-finance banking software. If your bank has multiple branches, or you want to provide your customers with the type of online implementations they enjoy from commercial banks, then this is the version ', '/public/product/5f609d1467c88sysbanker.png', '2020-09-15 12:53:08', '2020-10-28 16:08:44', 'OPEN', 1),
('5f6b1ea7a6a1d', '5f3e730721ece', 'dfdsc', 'dsfcdsfcd', '/public/product/5f6b1ea7a5cb1asset1.jpeg', '2020-09-23 12:08:39', '2020-09-23 10:15:40', 'OPEN', 0),
('5f6b1f1509da4', '5f3e730721ece', 'jhkjhk', 'jhkjk', '/public/product/5f6b1f4f067f7forbidden.png', '2020-09-23 12:10:29', '2020-09-23 10:12:24', 'OPEN', 0),
('5f6b1f28077dc', '5f3e730721ece', 'gjhhhjkj', 'khjkhj', '/public/product/5f6b1f2807091accsissp - Copy.png', '2020-09-23 12:10:48', '2020-09-23 10:29:08', 'OPEN', 0),
('5f6b23e9ec6fb', '5f3e730721ece', 'dcsdf', 'dsfdvc', '/public/product/5f6b23e9ec060accsissp.png', '2020-09-23 12:31:05', '2020-09-23 10:31:21', 'OPEN', 0),
('5f6b23f4e5e73', '5f3e730721ece', 'dfvdg', 'fdgfdg', '/public/product/5f6b23f4e57deasset1.jpeg', '2020-09-23 12:31:16', '2020-09-23 10:31:37', 'OPEN', 0),
('5f6b3bcd7d23e', '5f3e730721ece', 'gfythuyu', 'ghggh', '/public/product/5f6b3bcd7cac5asset1.jpeg', '2020-09-23 14:13:01', '2020-09-23 12:13:13', 'OPEN', 0),
('5f6b41272f8f5', '5f3e730721ece', 'xccxc ', 'cxxcxvc', '/public/product/5f6b41272f229Accsiss.png', '2020-09-23 14:35:51', '2020-09-23 13:32:17', 'OPEN', 0),
('5f6b4e8a8f72c', '5f3e730721ece', 'wdwdhjk', 'dsaaadc', '/public/product/5f6b4e8a8ea90asset1.jpeg', '2020-09-23 15:32:58', '2020-09-23 13:33:03', 'OPEN', 0),
('5f6b4ec235d6b', '5f3e730721ece', 'gfhyhyhyu', 'ghuyyiuyi', '/public/product/5f6b4ec23541dasset1.jpeg', '2020-09-23 15:33:54', '2020-09-23 13:33:54', 'OPEN', 1),
('5f6b4ed384bdd', '5f3e730721ece', 'Accsiss PPs', 'Accsiss PPsAccsiss PPsAccsiss PPsAccsiss PPsAccsiss fdgfg', '/public/product/5f6b4ed384430accsissp.png', '2020-09-23 15:34:11', '2020-09-23 13:57:32', 'OPEN', 1),
('5f73359373f7e', '5f3e730721ece', 'Accsiss eBs ', 'Accsiss eBs is an accounting software, designed to run in multiple locations across different states, nations and continents, with complex network and diverse platforms. This version combines the functionalities of the small business version and more.\r\n\r\n', '/public/product/5f73359373840Accsiss.png', '2020-09-29 15:24:35', '2020-09-29 13:24:35', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` varchar(20) NOT NULL,
  `title` varchar(32) NOT NULL,
  `code` varchar(16) NOT NULL,
  `cost` double NOT NULL DEFAULT 0,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `code`, `cost`, `date_added`, `hfield`, `status`) VALUES
('5f73d357a160f', 'Bank Verifcation Number ', 'BVN', 437, '2020-09-30 01:37:43', 'OPEN', 1),
('5f73d3e5d13b8', 'Customer Account Verification', 'CAV', 10, '2020-09-30 00:36:18', 'OPEN', 1),
('5f748d5748710', 'Johnny Just Come', 'JJC', 200, '2020-09-30 14:51:19', 'OPEN', 0),
('5f748dc506d84', 'Add Wallet Fund', 'FUND', 0, '2020-09-30 14:53:09', 'OPEN', 1),
('5f842c248f6fb', 'Interbank Transfer', 'IBT', 90, '2020-10-12 11:12:52', 'OPEN', 1),
('5f9997be09d51', 'Commercial bank verification', 'CBV', 300, '2020-10-28 16:09:34', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `country_id` int(11) NOT NULL,
  `states_id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0= CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`country_id`, `states_id`, `name`, `status`) VALUES
(1, 1, 'Abia', 1),
(1, 2, 'Adamawa', 1),
(1, 3, 'Akwa Ibom', 1),
(1, 4, 'Anambra', 1),
(1, 5, 'Bauchi', 1),
(1, 6, 'Bayelsa', 1),
(1, 7, 'Benue', 1),
(1, 8, 'Borno', 1),
(1, 9, 'Cross River ', 1),
(1, 10, 'Delta', 1),
(1, 11, 'Ebonyi', 1),
(1, 12, 'Enugu', 1),
(1, 13, 'Edo', 1),
(1, 14, 'Ekiti', 1),
(1, 15, 'Gombe', 1),
(1, 16, 'Imo', 1),
(1, 17, 'Jigawa', 1),
(1, 18, 'Kaduna', 1),
(1, 19, 'Kano', 1),
(1, 20, 'Katsina', 1),
(1, 21, 'Kebbi         ', 1),
(1, 22, 'Kogi', 1),
(1, 23, 'Kwara', 1),
(1, 24, 'Lagos', 1),
(1, 25, 'Nasarawa', 1),
(1, 26, 'Niger', 1),
(1, 27, 'Ogun', 1),
(1, 28, 'Ondo', 1),
(1, 29, 'Osun', 1),
(1, 30, 'Oyo', 1),
(1, 31, 'Plateau', 1),
(1, 32, 'Rivers', 1),
(1, 33, ' Sokoto ', 1),
(1, 34, 'Taraba', 1),
(1, 35, 'Yobe', 1),
(1, 36, '  Zamfara ', 1),
(1, 37, 'F. C. T', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticketchat`
--

CREATE TABLE `ticketchat` (
  `id` varchar(50) NOT NULL,
  `ticket_id` varchar(50) NOT NULL,
  `sender_id` varchar(15) NOT NULL,
  `sender` varchar(128) NOT NULL,
  `senderemail` varchar(128) NOT NULL,
  `role` varchar(10) NOT NULL,
  `message` mediumtext NOT NULL,
  `files` mediumtext NOT NULL,
  `messagestatus` enum('unread','read') NOT NULL DEFAULT 'read',
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticketchat`
--

INSERT INTO `ticketchat` (`id`, `ticket_id`, `sender_id`, `sender`, `senderemail`, `role`, `message`, `files`, `messagestatus`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f448594df54d', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:29:24', '2020-08-25 03:29:24', 'OPEN', 1),
('5f44859627150', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:29:26', '2020-08-25 03:29:26', 'OPEN', 1),
('5f4485974c18e', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:29:27', '2020-08-25 03:29:27', 'OPEN', 1),
('5f4485d6d16dd', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:30:30', '2020-08-25 03:30:30', 'OPEN', 1),
('5f4485e8249e6', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:30:48', '2020-08-25 03:30:48', 'OPEN', 1),
('5f4486298bf7d', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:31:53', '2020-08-25 03:31:53', 'OPEN', 1),
('5f44864f071b3', '5f447cb8e7b31', '5f3e930330e28', '', '', 'user', 'This is my second complain', '[]', 'read', '2020-08-25 05:32:31', '2020-08-25 03:32:31', 'OPEN', 1),
('5f55a125a4581', '5f54157ee599b', '5f44c8e94593e', '', '', 'admin', 'mother fucker', '[]', 'read', '2020-09-07 04:55:33', '2020-09-07 02:55:33', 'OPEN', 1),
('5f55fb2320138', '5f55f4912b2cd', '5f55e1285df33', '', '', 'user', 'How come i haven\'t gotten a reply', '[]', 'read', '2020-09-07 11:19:31', '2020-09-07 09:19:31', 'OPEN', 1),
('5f5f6b84a2af3', '5f5737054a29c', '5f44c8e94593e', '', '', 'admin', 'Hello', '[]', 'read', '2020-09-14 15:09:24', '2020-09-14 13:09:24', 'OPEN', 1),
('5f5f6b8a40ef7', '5f5737054a29c', '5f44c8e94593e', '', '', 'admin', 'Hello', '[]', 'read', '2020-09-14 15:09:30', '2020-09-14 13:09:30', 'OPEN', 1),
('5f5f6d07b8907', '5f5737054a29c', '5f44c8e94593e', '', '', 'admin', 'Hey', '[]', 'read', '2020-09-14 15:15:51', '2020-09-14 13:15:51', 'OPEN', 1),
('5f5f6d402e0e4', '5f573a4d572b5', '5f44c8e94593e', '', '', 'admin', 'Hello', '[]', 'read', '2020-09-14 15:16:48', '2020-09-14 13:16:48', 'OPEN', 1),
('5f5f6d61f338d', '5f573a4d572b5', '5f44c8e94593e', '', '', 'admin', 'Hello', '[]', 'read', '2020-09-14 15:17:21', '2020-09-14 13:17:21', 'OPEN', 1),
('5f5f6d936c9fe', '5f573a4d572b5', '5f44c8e94593e', '', '', 'admin', 'Hey!', '[]', 'read', '2020-09-14 15:18:11', '2020-09-14 13:18:11', 'OPEN', 1),
('5f609c4d75646', '5f5f7caad061c', '5f44c8e94593e', '', '', 'admin', 'this.state.id', '[\"\\/public\\/ticket\\/5f609c4d752bdpdf.png\"]', 'read', '2020-09-15 12:49:49', '2020-09-15 10:49:49', 'OPEN', 1),
('5f609c5c063a8', '5f5f7caad061c', '5f44c8e94593e', '', '', 'admin', 'y accepted files are *pdf, *jpg, *jpeg and *png', '[\"\\/public\\/ticket\\/5f609c5c0601dpdf.png\"]', 'read', '2020-09-15 12:50:04', '2020-09-15 10:50:04', 'OPEN', 1),
('5f6c682a80078', '5f573a85519c3', '5f55e1285df33', '', '', 'user', 'Hello', '[]', 'read', '2020-09-24 11:34:34', '2020-09-24 09:34:34', 'OPEN', 1),
('5f7345372d274', '5f689e3f9da3d', '5f44c8e94593e', '', '', 'admin', 'Hey', '[\"\\/public\\/ticket\\/5f7345372adb2product-placeholder - Copy.gif\"]', 'read', '2020-09-29 16:31:19', '2020-09-29 14:31:19', 'OPEN', 1),
('5f7346c1af0ba', '5f689e3f9da3d', '5f44c8e94593e', '', '', 'admin', 'hey', '[]', 'read', '2020-09-29 16:37:53', '2020-09-29 14:37:53', 'OPEN', 1),
('5f73479c1153a', '5f689e3f9da3d', '5f44c8e94593e', '', '', 'admin', 'Message is empty', '[\"\\/public\\/ticket\\/5f73479c11138pdf.png\"]', 'read', '2020-09-29 16:41:32', '2020-09-29 14:41:32', 'OPEN', 1),
('5f7347e32496d', '5f689d4143ab1', '5f44c8e94593e', '', '', 'admin', 'sds', '[]', 'read', '2020-09-29 16:42:43', '2020-09-29 14:42:43', 'OPEN', 1),
('5f7347e63c961', '5f689d4143ab1', '5f44c8e94593e', '', '', 'admin', 'sds', '[]', 'read', '2020-09-29 16:42:46', '2020-09-29 14:42:46', 'OPEN', 1),
('5f734819e7643', '80254694', '5f44c8e94593e', '', '', 'admin', 'Hey!', '[\"\\/public\\/ticket\\/5f734819e726aforbidden.png\"]', 'read', '2020-09-29 16:43:37', '2020-09-29 14:43:37', 'OPEN', 1),
('5f734846da4cb', '33973718', '5f44c8e94593e', '', '', 'admin', 'dfd', '[\"\\/public\\/ticket\\/5f734846da0bdforbidden2.png\"]', 'read', '2020-09-29 16:44:22', '2020-09-29 14:44:22', 'OPEN', 1),
('5f73486b33789', '33973718', '5f44c8e94593e', '', '', 'admin', 'Aye aye master', '[\"\\/public\\/ticket\\/5f73486b333e0accsissp.png\"]', 'read', '2020-09-29 16:44:59', '2020-09-29 14:44:59', 'OPEN', 1),
('5f7348b00da84', '33973718', '5f44c8e94593e', '', '', 'admin', 'fdvfd', '[\"\\/public\\/ticket\\/5f7348b00d555mira - Copy.png\"]', 'read', '2020-09-29 16:46:08', '2020-09-29 14:46:08', 'OPEN', 1),
('5f7348bbaaf61', '33973718', '5f44c8e94593e', '', '', 'admin', 'vcbvcb', '[\"\\/public\\/ticket\\/5f7348bbaaba9asset1.jpeg\"]', 'read', '2020-09-29 16:46:19', '2020-09-29 14:46:19', 'OPEN', 1),
('5f7349142dfad', '5f689e5dc0e50', '5f44c8e94593e', '', '', 'admin', 'dfdg', '[]', 'read', '2020-09-29 16:47:48', '2020-09-29 14:47:48', 'OPEN', 1),
('5f73491bcf843', '5f689e5dc0e50', '5f44c8e94593e', '', '', 'admin', 'fdgdf', '[\"\\/public\\/ticket\\/5f73491bcf4c6mira - Copy.png\"]', 'read', '2020-09-29 16:47:55', '2020-09-29 14:47:55', 'OPEN', 1),
('5f7349553f431', '5f689e3f9da3d', '5f44c8e94593e', '', '', 'admin', 'bvn', '[]', 'read', '2020-09-29 16:48:53', '2020-09-29 14:48:53', 'OPEN', 1),
('5f7349693a97a', '98126256', '5f44c8e94593e', '', '', 'admin', 'fxdvd', '[]', 'read', '2020-09-29 16:49:13', '2020-09-29 14:49:13', 'OPEN', 1),
('5f7349804ba4c', '5f68a320376ed', '5f44c8e94593e', '', '', 'admin', 'dfd', '[]', 'read', '2020-09-29 16:49:36', '2020-09-29 14:49:36', 'OPEN', 1),
('5f734987ef0cc', '5f68a320376ed', '5f44c8e94593e', '', '', 'admin', 'fdgd', '[\"\\/public\\/ticket\\/5f734987eece6product-placeholder - Copy.gif\"]', 'read', '2020-09-29 16:49:43', '2020-09-29 14:49:43', 'OPEN', 1),
('5f968f49d8ccf', '33973718', '5f44c8e94593e', '', '', 'admin', 'hey\r\n', '[]', 'read', '2020-10-26 09:56:41', '2020-10-26 08:56:41', 'OPEN', 1),
('5f96920e66b11', '33973718', '5f55e1285df33', '', '', 'user', 'Issokay\r\n', '[]', 'read', '2020-10-26 10:08:30', '2020-10-26 09:08:30', 'OPEN', 1),
('5fb65b80e5284', '33973718', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'hey', '[\"\\/public\\/ticket\\/5fb65b80e4efcabout.jpg\"]', 'read', '2020-11-19 12:48:16', '2020-11-19 11:48:16', 'OPEN', 1),
('5fb698bb3d526', '71263299', '5f3e930330e28', '', '', 'user', 'test replky', '[]', 'read', '2020-11-19 17:09:31', '2020-11-19 16:09:31', 'OPEN', 1),
('5fb698d3f2384', '71263299', '5f3e930330e28', '', '', 'user', 'test reply', '[]', 'read', '2020-11-19 17:09:55', '2020-11-19 16:09:55', 'OPEN', 1),
('5fb69cb032340', '3361515', '5f3e930330e28', '', '', 'user', 'test reply ', '[]', 'read', '2020-11-19 17:26:24', '2020-11-19 16:26:24', 'OPEN', 1),
('5fb69cc316b2f', '3361515', '5f3e930330e28', '', '', 'user', 'test reply', '[]', 'read', '2020-11-19 17:26:43', '2020-11-19 16:26:43', 'OPEN', 1),
('5fb69d7febd6f', '3361515', '5f3e930330e28', '', 'superadmin@gmail.com', 'user', 'test reply', '[]', 'read', '2020-11-19 17:29:51', '2020-11-19 16:29:51', 'OPEN', 1),
('5fb78032b216b', '45782991', '5f508fad22326', 'Dominic Olajire', 'olajiredominic@gmail.com', 'user', 'We are really sorry for the inviniences caused. Please hold on we\'d get to you shortly', '[]', 'read', '2020-11-20 09:37:06', '2020-11-20 08:37:06', 'OPEN', 1),
('5fb78672cab8d', '71263299', '5f3e930330e28', '', 'superadmin@gmail.com', 'user', 'reply me 3', '[]', 'read', '2020-11-20 10:03:46', '2020-11-20 09:03:46', 'OPEN', 1),
('5fb7875a2fd07', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'i need a reply ASAP', '[]', 'read', '2020-11-20 10:07:38', '2020-11-20 09:07:38', 'OPEN', 1),
('5fb78769376d5', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'now', '[]', 'read', '2020-11-20 10:07:53', '2020-11-20 09:07:53', 'OPEN', 1),
('5fb787a030491', '17547502', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'Your message is blurry', '[]', 'read', '2020-11-20 10:08:48', '2020-11-20 09:08:48', 'OPEN', 1),
('5fb789156cfdf', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'it\'s noted', '[]', 'read', '2020-11-20 10:15:01', '2020-11-20 09:15:01', 'OPEN', 1),
('5fb78928e85fa', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'more replies pls \r\n', '[]', 'read', '2020-11-20 10:15:20', '2020-11-20 09:15:20', 'OPEN', 1),
('5fb789507afd0', '17547502', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'Sincerely, I don\'t know what to type....\r\n', '[]', 'read', '2020-11-20 10:16:00', '2020-11-20 09:16:00', 'OPEN', 1),
('5fb7895b057c5', '17547502', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'Are you there?\r\n', '[]', 'read', '2020-11-20 10:16:11', '2020-11-20 09:16:11', 'OPEN', 1),
('5fb7896b7ab70', '17547502', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'Hey!', '[]', 'read', '2020-11-20 10:16:27', '2020-11-20 09:16:27', 'OPEN', 1),
('5fb789a9ec017', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'yeah, u better think of something, lol', '[]', 'read', '2020-11-20 10:17:29', '2020-11-20 09:17:29', 'OPEN', 1),
('5fb789c384378', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'i think i have what i need, thanks', '[]', 'read', '2020-11-20 10:17:55', '2020-11-20 09:17:55', 'OPEN', 1),
('5fb78a38ce724', '17547502', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'hey', '[\"\\/public\\/ticket\\/5fb78a38ce311about.jpg\"]', 'read', '2020-11-20 10:19:52', '2020-11-20 09:19:52', 'OPEN', 1),
('5fb78a7d6e571', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'does this have an attachment ?', '[]', 'read', '2020-11-20 10:21:01', '2020-11-20 09:21:01', 'OPEN', 1),
('5fb78aad0e698', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'here\'s some', '[\"\\/public\\/ticket\\/5fb78aad0df76futunelogo.jpg\",\"\\/public\\/ticket\\/5fb78aad0e37dumunelogo.png\"]', 'read', '2020-11-20 10:21:49', '2020-11-20 09:21:49', 'OPEN', 1),
('5fb794002fe73', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestiae sunt iusto vero cupiditate nisi rem, quis pariatur cum eaque tenetur voluptas repellendus, assumenda ipsam consequuntur eligendi sapiente in sint!', '[]', 'read', '2020-11-20 11:01:36', '2020-11-20 10:01:36', 'OPEN', 1),
('5fb79af7b19a3', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'A new message', '[]', 'read', '2020-11-20 11:31:19', '2020-11-20 10:31:19', 'OPEN', 1),
('5fb79b436958e', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'A test message with attachments', '[\"\\/public\\/ticket\\/5fb79b4368f46futunelogo.jpg\",\"\\/public\\/ticket\\/5fb79b43692deumunelogo.png\"]', 'read', '2020-11-20 11:32:35', '2020-11-20 10:32:35', 'OPEN', 1),
('5fb7a6a8ce381', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'hey', '[]', 'read', '2020-11-20 12:21:12', '2020-11-20 11:21:12', 'OPEN', 1),
('5fb7a7ee78428', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'treset', '[]', 'read', '2020-11-20 12:26:38', '2020-11-20 11:26:38', 'OPEN', 1),
('5fb7a8583f535', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'now now', '[]', 'read', '2020-11-20 12:28:24', '2020-11-20 11:28:24', 'OPEN', 1),
('5fb7a8b7d7b88', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', '\r\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Velit sit eum repellendus ducimus voluptate neque suscipit repellat consequuntur dolor doloribus, placeat officia blanditiis quibusdam, quos magni cum. A, exercitationem doloribus.\r\nLorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum unde ut sequi ab dolore. Unde facilis, eos omnis laborum sed officia quod voluptatum ratione praesentium obcaecati vel assumenda quis iusto.', '[]', 'read', '2020-11-20 12:29:59', '2020-11-20 11:29:59', 'OPEN', 1),
('5fb7ab5506dfb', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'test ', '[]', 'read', '2020-11-20 12:41:09', '2020-11-20 11:41:09', 'OPEN', 1),
('5fb7b72c3a068', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'test', '[\"\\/public\\/ticket\\/5fb7b72c39ce0umunelogo.png\"]', 'read', '2020-11-20 13:31:40', '2020-11-20 12:31:40', 'OPEN', 1),
('5fb7b74211f0f', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'a new one', '[\"\\/public\\/ticket\\/5fb7b7421117ddownload (2).jpg\",\"\\/public\\/ticket\\/5fb7b74211789download (1).jpg\",\"\\/public\\/ticket\\/5fb7b74211a28download.jpg\",\"\\/public\\/ticket\\/5fb7b74211ca1Front Line logo (1).png\"]', 'read', '2020-11-20 13:32:02', '2020-11-20 12:32:02', 'OPEN', 1),
('5fb7cd78b2f83', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'explainin gto kemi', '[]', 'read', '2020-11-20 15:06:48', '2020-11-20 14:06:48', 'OPEN', 1),
('5fb7cd7dc47a3', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'explainin gto kemi', '[]', 'read', '2020-11-20 15:06:53', '2020-11-20 14:06:53', 'OPEN', 1),
('5fb7cd831ffe9', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'explainin gto kemi', '[]', 'read', '2020-11-20 15:06:59', '2020-11-20 14:06:59', 'OPEN', 1),
('5fb7cd92180ac', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'hhh', '[]', 'read', '2020-11-20 15:07:14', '2020-11-20 14:07:14', 'OPEN', 1),
('5fb7cd9c12977', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'hhh', '[]', 'read', '2020-11-20 15:07:24', '2020-11-20 14:07:24', 'OPEN', 1),
('5fb7d2842ec61', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'utyeruyreudsy', '[\"\\/public\\/ticket\\/5fb7d2842e8dafutunelogo.jpg\"]', 'read', '2020-11-20 15:28:20', '2020-11-20 14:28:20', 'OPEN', 1),
('5fbbc45ab4d51', '17547502', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'hey', '[]', 'read', '2020-11-23 15:16:58', '2020-11-23 14:16:58', 'OPEN', 1),
('5fbd17abe2080', '5523540', '5f44c8e94593e', 'John Doe', 'lerryjay47@gmail.com', 'admin', 'react-trumbowyg\r\nhttps://openbase.io/js/react-trumbowyg', '[]', 'read', '2020-11-24 15:24:43', '2020-11-24 14:24:43', 'OPEN', 1),
('5fbd18c66a73e', '5523540', '5f3e930330e28', 'Admin Admin', 'superadmin@gmail.com', 'user', 'seen', '[]', 'read', '2020-11-24 15:29:26', '2020-11-24 14:29:26', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` varchar(50) NOT NULL,
  `company_id` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `deployment_id` varchar(50) DEFAULT NULL,
  `sender` varchar(128) NOT NULL,
  `senderemail` varchar(128) NOT NULL,
  `title` varchar(200) NOT NULL,
  `type` varchar(10) NOT NULL COMMENT 'complaint | enquiry | request',
  `message` mediumtext NOT NULL,
  `files` mediumtext NOT NULL,
  `ticketstatus` varchar(11) NOT NULL COMMENT 'pending | completed | closed | resolved',
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED',
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `company_id`, `customer_id`, `deployment_id`, `sender`, `senderemail`, `title`, `type`, `message`, `files`, `ticketstatus`, `createdat`, `modifiedat`, `status`, `hfield`) VALUES
('11423118', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Title is empty', 'complaint', 'Message is empty', '[\"\\/public\\/ticket\\/5f6c674de6850asset1.jpeg\"]', 'resolved', '2020-09-24 11:30:53', '2020-09-24 09:36:30', 1, 'OPEN'),
('12623905', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'new one', 'enquiry', 'new one', '[\"\\/public\\/ticket\\/5fb7aaf82e015futunelogo.jpg\"]', 'pending', '2020-11-20 12:39:36', '2020-11-20 11:39:36', 1, 'OPEN'),
('16605812', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'enquiry', 'testhkujasnkj', '[]', 'pending', '2020-11-20 12:57:03', '2020-11-20 11:57:03', 1, 'OPEN'),
('17547502', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'new dami ticket', 'complaint', 'send me a reply', '[\"\\/public\\/ticket\\/5fb7870abb91dfutunelogo.jpg\",\"\\/public\\/ticket\\/5fb7870abbe56futunelogo.jpg\"]', 'pending', '2020-11-20 10:06:18', '2020-11-20 09:06:18', 1, 'OPEN'),
('30629400', '5f3e930326318', '5f3e930330e28', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 17:21:23', '2020-11-19 16:21:23', 1, 'OPEN'),
('3361515', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'new ticket', 'complaint', 'test new tick', '[\"\\/public\\/ticket\\/5fb69c6d4474afutunelogo.jpg\",\"\\/public\\/ticket\\/5fb69c6d44d50futunelogo.jpg\"]', 'pending', '2020-11-19 17:25:17', '2020-11-19 16:25:17', 1, 'OPEN'),
('33973718', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Tgfh', 'enquiry', 'ghgjjn', '[]', 'pending', '2020-09-24 11:45:46', '2020-09-24 09:45:46', 1, 'OPEN'),
('35586897', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'enquiry', 'testhkujasnkj', '[]', 'pending', '2020-11-20 12:57:59', '2020-11-20 11:57:59', 1, 'OPEN'),
('37394945', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'enquiry', 'test', '[]', 'pending', '2020-11-20 13:45:35', '2020-11-20 12:45:35', 1, 'OPEN'),
('40255115', '5f3e930326318', '5f3e930330e28', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 17:22:52', '2020-11-19 16:22:52', 1, 'OPEN'),
('45782991', '5f3e730721ece', '5f508fad22326', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-20 09:35:38', '2020-11-20 08:35:38', 1, 'OPEN'),
('49347709', '5f3e730721ece', '', '', '', '', 'gfh', 'complaint', 'hgh', '[]', 'pending', '2020-10-28 14:16:50', '2020-10-28 13:16:50', 1, 'OPEN'),
('51068211', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'enquiry', 'test', '[]', 'pending', '2020-11-19 12:19:38', '2020-11-19 11:19:38', 1, 'OPEN'),
('5523540', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'cleave ticket', 'complaint', 'cleave ticket', '[]', 'pending', '2020-11-20 12:04:16', '2020-11-20 11:04:16', 1, 'OPEN'),
('56435952', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'cleave ticket', 'complaint', 'cleave ticket', '[]', 'pending', '2020-11-20 12:04:02', '2020-11-20 11:04:02', 1, 'OPEN'),
('59632835', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'cleave ticket', 'complaint', 'cleave ticket', '[]', 'pending', '2020-11-20 12:04:01', '2020-11-20 11:04:01', 1, 'OPEN'),
('5f447ca473367', '5f3e930326318', '5f3e930330e28', 'all', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-25 04:51:16', '2020-08-25 02:51:16', 1, 'OPEN'),
('5f447cb8e7b31', '5f3e930326318', '5f3e930330e28', 'all', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-25 04:51:36', '2020-08-25 02:51:36', 1, 'OPEN'),
('5f44fe2ce7b13', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-25 14:03:56', '2020-08-25 12:03:56', 1, 'OPEN'),
('5f4509c0c26d1', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-25 14:53:20', '2020-08-25 12:53:20', 1, 'OPEN'),
('5f48d751a9a85', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:07:13', '2020-08-28 10:07:13', 1, 'OPEN'),
('5f48d7f55548e', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:09:57', '2020-08-28 10:09:57', 1, 'OPEN'),
('5f48d7fccfdc8', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:10:04', '2020-08-28 10:10:04', 1, 'OPEN'),
('5f48d8132c381', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:10:27', '2020-08-28 10:10:27', 1, 'OPEN'),
('5f48d942575da', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:15:30', '2020-08-28 10:15:30', 1, 'OPEN'),
('5f48da2ca6094', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:19:24', '2020-08-28 10:19:24', 1, 'OPEN'),
('5f48da5c59896', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:20:12', '2020-08-28 10:20:12', 1, 'OPEN'),
('5f48db469602c', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:24:06', '2020-08-28 10:24:06', 1, 'OPEN'),
('5f48dc09c92d8', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[]', 'pending', '2020-08-28 12:27:21', '2020-08-28 10:27:21', 1, 'OPEN'),
('5f48dc4e23467', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[\"\\/public\\/ticket\\/5f48dc4e231c0ionic error fixes.txt\",\"\\/public\\/ticket\\/5f48dc4e23431Project management.txt\"]', 'pending', '2020-08-28 12:28:30', '2020-08-28 10:28:30', 1, 'OPEN'),
('5f48dd1c3bb5c', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[\"\\/public\\/ticket\\/5f48dd1c3bb1eionic error fixes.txt\"]', 'pending', '2020-08-28 12:31:56', '2020-08-28 10:31:56', 1, 'OPEN'),
('5f48dd50bcd0d', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[\"\\/public\\/ticket\\/5f48dd50bcbf9ionic error fixes.txt\"]', 'pending', '2020-08-28 12:32:48', '2020-08-28 10:32:48', 1, 'OPEN'),
('5f48ddb5791cb', '5f3e930326318', '5f3e930330e28', '', '', '', 'I am angry', 'enquiry', 'Someoen hurt me', '[\"\\/public\\/ticket\\/5f48ddb579190ionic error fixes.txt\"]', 'pending', '2020-08-28 12:34:29', '2020-08-28 10:34:29', 1, 'OPEN'),
('5f54157ee599b', '5f3e730721ece', '', '', '', '', 'Hello', 'request', 'How may i help yoy ?', '[]', 'pending', '2020-09-06 00:47:26', '2020-09-05 22:47:26', 1, 'OPEN'),
('5f559a41a0bcf', '5f3e730721ece', '', '', '', '', 'Some fucked up shii', 'complaint', 'Hello world', '[\"\\/public\\/ticket\\/5f559a41a0b53itunes-50.jpg\",\"\\/public\\/ticket\\/5f559a41a0b9eitunes-50.jpg\"]', 'pending', '2020-09-07 04:26:09', '2020-09-07 02:26:09', 1, 'OPEN'),
('5f559afb276b0', '5f3e730721ece', '', '', '', '', 'Another  test', 'complaint', 'Tes message', '[\"\\/public\\/ticket\\/5f559afb275ffitunes-50.jpg\",\"\\/public\\/ticket\\/5f559afb27682itunes-50.jpg\"]', 'pending', '2020-09-07 04:29:15', '2020-09-07 02:29:15', 1, 'OPEN'),
('5f55f4912b2cd', '5f3e730721ece', '5f55e1285df33', '', '', '', 'I have a request', 'request', 'Please how much is acciss ebs', '[\"\\/public\\/ticket\\/5f55f4912b03b4.jpg\",\"\\/public\\/ticket\\/5f55f4912b11a6.jpg\",\"\\/public\\/ticket\\/5f55f4912b1ba7.jpg\",\"\\/public\\/ticket\\/5f55f4912b2514.jpg\",\"\\/public\\/ticket\\/5f55f4912b2776.jpg\",\"\\/public\\/ticket\\/5f55f4912b2a67.jpg\"]', 'pending', '2020-09-07 10:51:29', '2020-09-07 08:51:29', 1, 'OPEN'),
('5f57195032faf', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Bad Customer service', 'complaint', 'Customer service is very bad', '[\"\\/public\\/ticket\\/5f57195031f69SEUN\'S NCS APPLICANT FORM.pdf\",\"\\/public\\/ticket\\/5f57195032f70SEUN\'S NCS APPLICANT FORM.pdf\"]', 'pending', '2020-09-08 07:40:32', '2020-09-08 05:40:32', 1, 'OPEN'),
('5f5737054a29c', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Test ticket', 'enquiry', 'whatever', '[\"\\/public\\/ticket\\/5f5737054a216SEUN\'S NCS APPLICANT FORM.pdf\",\"\\/public\\/ticket\\/5f5737054a26cSEUN\'S NCS APPLICANT FORM.pdf\"]', 'pending', '2020-09-08 09:47:17', '2020-09-08 07:47:17', 1, 'OPEN'),
('5f57381877037', '5f3e730721ece', '5f55e1285df33', '', '', '', 'test user', 'complaint', 'testing\r\n', '[]', 'resolved', '2020-09-08 09:51:52', '2020-09-24 09:42:23', 1, 'OPEN'),
('5f57388b8ecb5', '5f3e730721ece', '5f55e1285df33', '', '', '', 'test user', 'complaint', 'testing\r\n', '[]', 'pending', '2020-09-08 09:53:47', '2020-09-08 07:53:47', 1, 'OPEN'),
('5f5738f91c53c', '5f3e730721ece', '5f55e1285df33', '', '', '', 'test user', 'complaint', 'testing\r\n', '[]', 'pending', '2020-09-08 09:55:37', '2020-09-08 07:55:37', 1, 'OPEN'),
('5f573a4d572b5', '5f3e730721ece', '5f55e1285df33', '', '', '', 'test again', 'enquiry', 'messaging test', '[]', 'pending', '2020-09-08 10:01:17', '2020-09-08 08:01:17', 1, 'OPEN'),
('5f573a85519c3', '5f3e730721ece', '5f55e1285df33', '', '', '', 'test again', 'enquiry', 'messaging test', '[]', 'pending', '2020-09-08 10:02:13', '2020-09-23 15:33:29', 1, 'OPEN'),
('5f5f64f346dba', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'Title is blank', 'complaint', 'Message is empty', '[]', 'pending', '2020-09-14 14:41:23', '2020-09-14 12:41:23', 1, 'OPEN'),
('5f5f661ec39cf', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'Title', 'complaint', 'Message is empty', '[]', 'pending', '2020-09-14 14:46:22', '2020-09-14 12:46:22', 1, 'OPEN'),
('5f5f756948ff4', '5f3e730721ece', '5f50883aae094', '', '', '', 'Title is blank', 'enquiry', 'Message is empty', '[\"\\/public\\/ticket\\/5f5f756948cf1accsissp.png\"]', 'pending', '2020-09-14 15:51:37', '2020-09-14 13:51:37', 1, 'OPEN'),
('5f5f766678f48', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'fgh', 'enquiry', 'bbnbnn', '[]', 'pending', '2020-09-14 15:55:50', '2020-09-14 13:55:50', 1, 'OPEN'),
('5f5f7af6bc099', '5f3e730721ece', '5f44f8c01d37e', '', '', '', 'Title', 'complaint', 'Message is empty', '[\"\\/public\\/ticket\\/5f5f7af6bbce3Accsiss.png\"]', 'pending', '2020-09-14 16:15:18', '2020-09-14 14:15:18', 1, 'OPEN'),
('5f5f7b804c613', '5f3e730721ece', '5f44f8c01d37e', '', '', '', 'hggfh', 'complaint', 'hghjhjj', '[\"\\/public\\/ticket\\/5f5f7b804c11baccsissp.png\"]', 'pending', '2020-09-14 16:17:36', '2020-09-14 14:17:36', 1, 'OPEN'),
('5f5f7ba3bccbb', '5f3e730721ece', '5f44f8c01d37e', '', '', '', 'gdhh', 'complaint', 'ghghgjh', '[\"\\/public\\/ticket\\/5f5f7ba3bc99bmira - Copy.png\"]', 'pending', '2020-09-14 16:18:11', '2020-09-14 14:18:11', 1, 'OPEN'),
('5f5f7c5fb5b87', '5f3e730721ece', '', '', '', '', 'tgtyhth', 'complaint', 'hfjjg', '[\"\\/public\\/ticket\\/5f5f7c5fb587c404_not_found.png\"]', 'pending', '2020-09-14 16:21:19', '2020-09-14 14:21:19', 1, 'OPEN'),
('5f5f7caad061c', '5f3e730721ece', '', '', '', '', 'ghfjfhf', 'complaint', 'hgjkhjk', '[\"\\/public\\/ticket\\/5f5f7caad02f7404_not_found.png\"]', 'pending', '2020-09-14 16:22:34', '2020-09-23 15:33:15', 1, 'OPEN'),
('5f689a5271d64', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'Title is blank', 'complaint', 'Message is empty', '[\"\\/public\\/ticket\\/5f689a5269f9bAccsiss.png\"]', 'pending', '2020-09-21 14:19:30', '2020-09-21 12:19:30', 1, 'OPEN'),
('5f689b7485e57', '5f3e730721ece', '5f50883aae094', '', '', '', 'ghdshsjfd', 'enquiry', 'dsfkdfd', '[]', 'resolved', '2020-09-21 14:24:20', '2020-09-23 15:29:12', 1, 'OPEN'),
('5f689d32ed9cd', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'gfgfb', 'complaint', 'fghgfhn', '[]', 'resolved', '2020-09-21 14:31:46', '2020-09-23 15:29:55', 1, 'OPEN'),
('5f689d4143ab1', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'gfgfb', 'complaint', 'fghgfhn', '[]', 'pending', '2020-09-21 14:32:01', '2020-09-23 15:33:04', 1, 'OPEN'),
('5f689e3f9da3d', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'fd', 'complaint', 'fdg', '[]', 'cancelled', '2020-09-21 14:36:15', '2020-10-12 14:13:22', 1, 'OPEN'),
('5f689e5dc0e50', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'fdgf', 'complaint', 'ghgjg', '[\"\\/public\\/ticket\\/5f689e5dc0aa1accsissp - Copy.png\"]', 'resolved', '2020-09-21 14:36:45', '2020-09-23 15:29:50', 1, 'OPEN'),
('5f68a2dfb98ed', '5f3e730721ece', '', '', '', '', 'dgd', 'complaint', 'gngnhgn', '[]', 'resolved', '2020-09-21 14:55:59', '2020-09-23 15:29:51', 1, 'OPEN'),
('5f68a320376ed', '5f3e730721ece', '', '', '', '', 'dsfdd', 'enquiry', 'vdvdfgvd', '[\"\\/public\\/ticket\\/5f68a3203734eAccsiss.png\"]', 'cancelled', '2020-09-21 14:57:04', '2020-10-12 14:11:10', 1, 'OPEN'),
('61382794', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'cleave ticket', 'complaint', 'cleave ticket', '[]', 'pending', '2020-11-20 12:04:00', '2020-11-20 11:04:00', 1, 'OPEN'),
('65326379', '5f3e930326318', '5f3e930330e28', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 17:21:59', '2020-11-19 16:21:59', 1, 'OPEN'),
('67258191', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'enquiry', 'testhkujasnkj', '[]', 'pending', '2020-11-20 12:39:50', '2020-11-20 11:39:50', 1, 'OPEN'),
('71263299', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test 3', 'complaint', 'test 3', '[\"\\/public\\/ticket\\/5fb655d6ba581umunelogo.png\"]', 'pending', '2020-11-19 12:24:06', '2020-11-19 11:24:06', 1, 'OPEN'),
('74960327', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test', 'complaint', 'test', '[]', 'pending', '2020-11-20 12:05:55', '2020-11-20 11:05:55', 1, 'OPEN'),
('75473606', '5f3e930326318', '5f3e930330e28', '5fb64c503d402', 'Admin Admin', 'superadmin@gmail.com', 'test 2', 'complaint', 'test 2', '[]', 'pending', '2020-11-19 12:22:33', '2020-11-19 11:22:33', 1, 'OPEN'),
('80254694', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Blank Title', 'enquiry', 'Empty Message', '[\"\\/public\\/ticket\\/5f6c6b0728beb30-days-of-react-ebook-fullstackio.pdf\",\"\\/public\\/ticket\\/5f6c6b072ee8a404_not_found.png\",\"\\/public\\/ticket\\/5f6c6b072f376Accsiss - Copy.png\",\"\\/public\\/ticket\\/5f6c6b072f757Accsiss.png\",\"\\/public\\/ticket\\/5f6c6b072fafbaccsissp - Copy.png\"]', 'cancelled', '2020-09-24 11:46:47', '2020-10-07 14:57:55', 1, 'OPEN'),
('83891487', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Title', 'complaint', 'Message', '[\"\\/public\\/ticket\\/5f6c68f1c5f6b404_not_found.png\"]', 'pending', '2020-09-24 11:37:53', '2020-09-24 09:37:53', 1, 'OPEN'),
('89284277', '5f3e930326318', '5f3e930330e28', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 17:21:50', '2020-11-19 16:21:50', 1, 'OPEN'),
('92092154', '5f3e930326318', '5f3e930330e28', '5f99975bb1580', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 12:13:38', '2020-11-19 11:13:38', 1, 'OPEN'),
('96345277', '5f3e930326318', '5f3e930330e28', '5f6dffd7c7b2b', 'Olajire Dominic', 'olajiredominic@gmail.com', 'This is a sysbanker EE test issues', 'complaint', 'You guys haven\'t migrated the data as discussed', '[]', 'pending', '2020-11-19 17:16:12', '2020-11-19 16:16:12', 1, 'OPEN'),
('96536149', '5f3e730721ece', '5f4b8bf8b2bb2', '', '', '', 'Title', 'enquiry', 'Message', '[]', 'cancelled', '2020-09-30 17:03:33', '2020-10-07 14:34:57', 1, 'OPEN'),
('98126256', '5f3e730721ece', '5f55e1285df33', '', '', '', 'Title', 'complaint', 'Message', '[]', 'pending', '2020-09-24 11:40:01', '2020-09-24 09:40:01', 1, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `company_id` varchar(20) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(125) NOT NULL,
  `othername` varchar(200) NOT NULL,
  `address` tinytext DEFAULT NULL,
  `country_id` varchar(20) DEFAULT NULL,
  `state_id` varchar(20) DEFAULT NULL,
  `lga` varchar(200) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `telephone` varchar(200) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `tokenexpdate` date DEFAULT NULL,
  `tokenexptime` date DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user' COMMENT 'user | admin',
  `permissions` mediumtext NOT NULL DEFAULT '',
  `activation` varchar(15) NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING | DEACTIVATED | ACTIVATED',
  `imageurl` varchar(200) NOT NULL,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `company_id`, `lastname`, `firstname`, `othername`, `address`, `country_id`, `state_id`, `lga`, `email`, `telephone`, `username`, `password`, `token`, `tokenexpdate`, `tokenexptime`, `role`, `permissions`, `activation`, `imageurl`, `createdat`, `modifiedat`, `hfield`, `status`) VALUES
('5f3e930330e28', '5f3e730721ece', 'Dominic Olajire', '0', '', '', '', '', '', 'lerryjay45@gmail.com', '8182883452', '', '5f3e930324b78', '', '0000-00-00', '0000-00-00', 'user', '', 'PENDING', '', '2020-08-20 17:13:07', '2020-12-01 14:16:08', '', 1),
('5f44c8e94593e', '5f3e730721ece', 'Doe', 'John', '', '', '', '', '', 'lerryjay47@gmail.com', '9087654532', '', '$2y$10$9dZy4SS9GbY6GdUyyv3mkO2kF6eFeck7/Sa9jYgOZcbBmRu5YopYO', '123342', '2020-09-29', '0000-00-00', 'admin', 'UPDATEADMIN|VIEWADMIN|LISTADMIN|ADDADMIN|VIEWPRODUCT|CREATEUSER|SEARCHPRODUCT|UPDATEDEPLOYMENTFILE|LISTPRODUCT|UPDATEDEPLOYMENT|SEARCHCLIENT|SEARCHCLIENT|DELETEPRODUCT|DELETEPRODUCT|VIEWDEPLOYMENTFILE|CREATETICKET|CREATETICKET|LISTTICKET|MODIFYTICKET|VIEWTICKET|VIEWDEPLOYMENT|LISTCLIENT|ADDDEPLOYMENT|CREATECLIENT|REPLYTICKET|VIEWCLIENT|VIEWDEPLOYMENTCOST|UPDATECLIENT|VIEWDEPLOYMENTTIME|ADDPRODUCT|VIEWUSER|LISTUSER|UPDATEPRODUCT|UPDATEPRODUCT', 'PENDING', '/public/user/5f6c598a65dd0forbidden.jpg', '2020-08-25 10:16:41', '2020-12-01 14:16:04', 'OPEN', 1),
('5f44f8c01d37e', '5f3e730721ece', 'Dominic Olajire', '0', '', '', '', '', '', 'lerryjay46@gmail.com', '8182883458', NULL, '$2y$10$o5uW5fm7OO5U3BIsUUeTVevpTYtQDpZcWL.4PNHRzAlRtrroFJx0a', NULL, '0000-00-00', '0000-00-00', 'user', '', 'SUSPENDED', '/public/user/5f8057209d746payment.png', '2020-08-25 13:40:48', '2020-10-09 12:27:12', 'OPEN', 1),
('5f4b8bf8b2bb2', '5f3e730721ece', 'Ifeanyi Ici', '0', '', '', '', '', '', 'mira@miratechnologiesng.com', '8183456789', NULL, '$2y$10$DHyaFockhMqGk3NaKCwN0OeVphhLlI8s90QUZwJZwNJGZZjxfINGu', NULL, '0000-00-00', '0000-00-00', 'user', '', 'PENDING', '/public/user/5f6c70a99a2e9profile.png', '2020-08-30 13:22:32', '2020-09-24 10:10:49', 'OPEN', 1),
('5f4d1882183b1', '5f3e730721ece', 'Ifeanyi Ici', '0', '', '', '', '', '', 'mira2@miratechnologiesng.com', '8183456789', NULL, '$2y$10$B.k6xmX02WUSfP8xymh5JuXvBN2ecUKBKv2iJ/bNHwFjljeNBBl0G', NULL, '0000-00-00', '0000-00-00', 'user', '', 'PENDING', '', '2020-08-31 17:34:26', '2020-09-17 11:21:55', 'OPEN', 1),
('5f4dac3b1ce04', '5f3e730721ece', 'Dominic', '0', '', '', '', '', '', 'lerryjay48@gmail.com', '8182883451', NULL, '$2y$10$hBG9o859JBEQzncCZkxF9uEmtCcnnZ4ZtUBBf8rfRZZbA3Ca4MvdG', NULL, '0000-00-00', '0000-00-00', 'admin', 'LISTCLIENT|CREATETICKET|LISTTICKET|ADDADMIN|MODIFYTICKET|VIEWCLIENT|SEARCHCLIENT|VIEWDEPLOYMENTTIME|UPDATEDEPLOYMENT', 'PENDING', '', '2020-09-01 04:04:43', '2020-10-09 07:57:38', 'OPEN', 1),
('5f50883aae094', '5f3e730721ece', 'Domino', 'Olajire', 'Emma', NULL, NULL, NULL, NULL, 'lerryjay49@gmail.com', '8182883345', 'jireh', '$2y$10$CGHIpX94wNIUUyjt0QYwFuvyMpWP.tVO4eoO5lsyHuUrC8iWr9K8m', NULL, '0000-00-00', '0000-00-00', 'user', '', 'SUSPENDED', '/public/user/5f6b6de00c5efmira - Copy.png', '2020-09-03 08:07:54', '2020-09-23 15:46:40', 'OPEN', 1),
('5f508fad22326', '5f3e730721ece', 'Chizo', 'Osondu', 'Emmanuel', NULL, NULL, NULL, NULL, 'user@whatever.com', '8183456789', NULL, '$2y$10$9eP37A2QKr3FWMmjEa2SJ.gYxVADQ6/tW3ijsmjrmu7.HWowbvImG', NULL, '0000-00-00', '0000-00-00', 'user', '', 'SUSPENDED', '', '2020-09-03 08:39:41', '2020-09-17 11:21:55', 'OPEN', 1),
('5f55e1285df33', '5f3e730721ece', 'Dominic', 'Olajire', 'Emmanuel', NULL, NULL, NULL, NULL, 'olajire@mail.com', '9078675645', NULL, '$2y$10$9dZy4SS9GbY6GdUyyv3mkO2kF6eFeck7/Sa9jYgOZcbBmRu5YopYO', '123342', '2020-09-15', '0000-00-00', 'user', 'LISTPRODUCT|LISTTICKET|CREATETICKET|VIEWTICKET', 'SUSPENDED', '/public/user/5f7455f4bb162Accsiss.png', '2020-09-07 09:28:40', '2020-09-30 09:55:00', 'OPEN', 1),
('5f5b679b5bb34', '5f3e730721ece', 'Doe', 'John', '', NULL, NULL, NULL, NULL, 'john@gmail.com', '9087654532', NULL, '$2y$10$x6k36bzcMBp4UPu3iNGXsun6zez777XlE.MdxyhiIN7m99S/pegMW', NULL, '0000-00-00', '0000-00-00', 'admin', 'UPDATEDEPLOYMENT|UPDATEDEPLOYMENT', 'PENDING', '', '2020-09-11 14:03:39', '2020-09-18 12:54:06', 'OPEN', 1),
('5f5f750835723', '5f3e730721ece', 'lorem', 'gfdddghhh', 'loremhhfhhf', NULL, NULL, NULL, NULL, 'lorem@gmail.com', '843884847744774', NULL, '$2y$10$9wuw7/ZLbnIWULH1ShXhneIzZyk0yxh8BFqgc1MhRSNP4gVbT5GUG', NULL, '0000-00-00', '0000-00-00', 'user', '', 'PENDING', '', '2020-09-14 15:50:00', '2020-09-17 11:21:55', 'OPEN', 0),
('5f69d64840860', '5f3e730721ece', 'Doe', 'Theophilusxncnxn', 'gfhgf', NULL, NULL, NULL, NULL, 'email@email.com', '3245675664554', NULL, '$2y$10$BisrXDK8bSOLySU29M9PpOwXk2lB6Skx9fZCfdU1wUi5yikvYWoiC', NULL, NULL, NULL, 'user', '', 'PENDING', '/public/user/5f80588dd37cdforbidden.jpg', '2020-09-22 12:47:36', '2020-10-09 12:33:17', 'OPEN', 1),
('5f7d9e163fa59', '5f3e730721ece', 'Collins', 'Feyikemi', '', NULL, NULL, NULL, NULL, 'feyi@gmail.com', '90657434165', NULL, '$2y$10$7ZEtXRHOb9dtCVFx2Rqg6OBIng8ELS/IeTfaEqYljSbfS5Atz/gpW', '592225', '2020-10-07', '0000-00-00', 'admin', 'VIEWUSER', 'PENDING', '', '2020-10-07 12:53:10', '2020-10-12 08:46:24', 'a7917e26b050222e0136d9b83f37700d', 1),
('5f96b2bfac160', '5f3e730721ece', 'Enola', 'Holmes', 'Fashola', NULL, NULL, NULL, NULL, 'admin@sleekfit.com', '43789359435', NULL, '$2y$10$BvU6mfnybDggDHcd1PCvTu3tT9SZ1lGl646SMbjCgu5ai5oMyzu2W', NULL, NULL, NULL, 'user', '', 'PENDING', '', '2020-10-26 12:27:59', '2020-10-26 11:27:59', 'OPEN', 1),
('5f96b33a54932', '5f3e730721ece', 'Enola', 'Holmes', 'Fashola', NULL, NULL, NULL, NULL, 'admin@sleekfit.com.ng', '437893594356767', NULL, '$2y$10$FnK4Xkwc90uul8cLViWJXOae2AYmacHXQxQeO9BLcTC8nWdVqe/MG', NULL, NULL, NULL, 'user', '', 'PENDING', '', '2020-10-26 12:30:02', '2020-10-26 11:30:02', 'OPEN', 1),
('5f999703bddd3', '5f3e730721ece', 'Client', 'Test', '', NULL, NULL, NULL, NULL, 'test@gmail.com', '908756656656', NULL, '$2y$10$OhSqn7GtBGtK8KvvGQ..RexundmRO1FkBgh9SVnsC/i4Kx2X9eN6W', NULL, NULL, NULL, 'user', '', 'PENDING', '', '2020-10-28 17:06:27', '2020-10-28 16:06:27', 'OPEN', 1),
('5fb64b85e831b', '5f3e730721ece', 'Smith', 'Adams', 'Leo', NULL, NULL, NULL, NULL, 'info@gmail.com', '8045267738', NULL, '$2y$10$Hph.H2xLmcFudPVbf7lk7ufmGK10wntoNxZ1hswzPSBl1Qfwydr7O', NULL, NULL, NULL, 'user', '', 'PENDING', '', '2020-11-19 11:40:05', '2020-11-19 10:40:05', 'OPEN', 1),
('5fb64c1da674f', '5f3e730721ece', 'Smith', 'Adams', 'Leo', NULL, NULL, NULL, NULL, 'adams@gmail.com', '8045267738', NULL, '$2y$10$Irn93WGD201eUkmoQm1rEus.FRqkZz6aDWmI9kLlUpUI8TafJbiPy', NULL, NULL, NULL, 'user', '', 'PENDING', '', '2020-11-19 11:42:37', '2020-11-19 10:42:37', 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `transaction_id` int(11) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `company_id` varchar(20) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `tdate` date DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `hfield` varchar(250) DEFAULT 'OPEN',
  `tlog` varchar(250) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`transaction_id`, `user_id`, `company_id`, `debit`, `credit`, `tdate`, `description`, `hfield`, `tlog`, `status`) VALUES
(1, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:33:10|1000|5f99975bb1580', 1),
(2, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:33:33|1000|5f99975bb1580', 1),
(3, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:35:10|1000|5f99975bb1580', 1),
(4, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:37:13|1000|5f99975bb1580', 1),
(5, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:37:21|1000|5f99975bb1580', 1),
(6, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:38:19|1000|5f99975bb1580', 1),
(7, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:39:49|1000|5f99975bb1580', 1),
(8, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-11-30 17:41:12|1000|5f99975bb1580', 1),
(9, '5f3e930330e28', '5f3e730721ece', 1000, 0, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-12-01 08:41:09|1000|5f99975bb1580', 1),
(10, '5f3e930330e28', '5f3e730721ece', 0, 1000, '2020-11-30', 'Fund Wallet', 'OPEN', '2020-12-01 08:46:15|1000|5f99975bb1580', 1),
(11, '5f3e930330e28', '5f3e730721ece', 100, 0, '2020-12-01', 'Fund Wallet', 'OPEN', '2020-12-01 09:01:15|100|5f99975bb1580', 1),
(12, '5f999703bddd3', '5f3e730721ece', 0, 1000, '2020-12-01', 'Fund Wallet', 'OPEN', '2020-12-01 13:15:21|1000|5f99975bb1580', 1);

-- --------------------------------------------------------

--
-- Table structure for table `weblog`
--

CREATE TABLE `weblog` (
  `id` varchar(20) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `page` varchar(50) DEFAULT NULL,
  `sessionid` varchar(50) DEFAULT NULL,
  `ip` varchar(80) DEFAULT NULL,
  `device` varchar(100) DEFAULT NULL,
  `browser` varchar(150) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `carrier` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `hfield` varchar(200) NOT NULL DEFAULT 'OPEN',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = OPEN, 0 = CLOSED'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `weblog`
--

INSERT INTO `weblog` (`id`, `url`, `page`, `sessionid`, `ip`, `device`, `browser`, `location`, `carrier`, `created_at`, `modified_at`, `hfield`, `status`) VALUES
('2134rwsfa4r1', 'https://www.miratechnologiesng.com', 'home', '12r3463gagw45t6qatgq', '192.168.1.4', 'Windows ', 'Chrome', 'Lagos, Nigeria', 'Etisalat', '2020-10-26 15:24:59', '2020-10-26 15:24:59', 'OPEN', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apilogs`
--
ALTER TABLE `apilogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `company_id` (`deployment_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `email` (`email`),
  ADD KEY `telephone` (`telephone`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `deployments`
--
ALTER TABLE `deployments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `productmodules`
--
ALTER TABLE `productmodules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`states_id`);

--
-- Indexes for table `ticketchat`
--
ALTER TABLE `ticketchat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `customer_id` (`customer_id`,`deployment_id`),
  ADD KEY `ticketstatus` (`ticketstatus`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Company` (`company_id`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `weblog`
--
ALTER TABLE `weblog`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apilogs`
--
ALTER TABLE `apilogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85497563;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `states_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
