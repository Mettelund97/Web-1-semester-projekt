-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Vært: mysql
-- Genereringstid: 18. 12 2024 kl. 09:43:58
-- Serverversion: 8.4.2
-- PHP-version: 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `KubeLabDB`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Configs`
--

CREATE TABLE `Configs` (
  `id` int NOT NULL,
  `configKey` varchar(255) NOT NULL,
  `configValue` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Configs`
--

INSERT INTO `Configs` (`id`, `configKey`, `configValue`) VALUES
(1, 'PORTAINERTOKEN', '');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Groups`
--

CREATE TABLE `Groups` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Groups`
--

INSERT INTO `Groups` (`id`, `name`, `createdAt`) VALUES
(1, 'WUOE23', '2024-11-05 09:37:28'),
(2, 'WUOE24', '2024-11-05 09:37:28'),
(3, 'WUOE25', '2024-11-05 09:37:28'),
(4, 'WUOE25TEST', '2024-11-05 09:37:28');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Roles`
--

CREATE TABLE `Roles` (
  `id` int NOT NULL,
  `type` enum('superadmin','admin','student') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Roles`
--

INSERT INTO `Roles` (`id`, `type`) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'student');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Stacks`
--

CREATE TABLE `Stacks` (
  `id` int NOT NULL,
  `title` varchar(155) NOT NULL,
  `subdomain` varchar(155) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  `portainerStackId` varchar(255) DEFAULT NULL,
  `lastSynced` datetime DEFAULT NULL,
  `syncStatus` enum('synced','pending','error') NOT NULL DEFAULT 'pending',
  `syncMessage` text,
  `groupId` int DEFAULT NULL,
  `templateId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Stacks`
--

INSERT INTO `Stacks` (`id`, `title`, `subdomain`, `status`, `createdAt`, `userId`, `portainerStackId`, `lastSynced`, `syncStatus`, `syncMessage`, `groupId`, `templateId`) VALUES
(281, 'hejhej', 'hejtest123', 1, '2024-12-04 13:17:58', 18, '333', '2024-12-18 09:43:16', 'synced', NULL, 2, 1),
(335, 'testsdsdsdsdd', 'undefined', 1, '2024-12-18 09:37:46', NULL, '726', '2024-12-18 09:43:16', 'synced', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Templates`
--

CREATE TABLE `Templates` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `service` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Templates`
--

INSERT INTO `Templates` (`id`, `name`, `service`) VALUES
(1, 'WordPress w. phpmyadmin', 'networks:\n  traefik-proxy:\n    external: true\n  wp-network:\n    driver: overlay\nservices:\n  wordpress:\n    image: wordpress:latest\n    environment:\n      WORDPRESS_DB_HOST: db\n      WORDPRESS_DB_USER: wpuser\n      WORDPRESS_DB_PASSWORD: wppassword\n      WORDPRESS_DB_NAME: wpdatabase\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.CHANGEME01.rule=Host(`SUBDOMAIN01.kubelab.dk`)\n        - traefik.http.routers.CHANGEME01.entrypoints=web,websecure\n        - traefik.http.routers.CHANGEME01.tls.certresolver=letsencrypt\n        - traefik.http.services.CHANGEME01.loadbalancer.server.port=80\n  db:\n    image: mariadb:latest\n    environment:\n      MYSQL_ROOT_PASSWORD: rootpassword\n      MYSQL_DATABASE: wpdatabase\n      MYSQL_USER: wpuser\n      MYSQL_PASSWORD: wppassword\n    networks:\n      - wp-network\n  phpmyadmin:\n    image: phpmyadmin:latest\n    environment:\n      PMA_HOST: db\n      PMA_USER: wpuser\n      PMA_PASSWORD: wppassword\n    networks:\n      - traefik-proxy\n      - wp-network\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.CHANGEME02.rule=Host(`SUBDOMAIN02.kubelab.dk`)\n        - traefik.http.routers.CHANGEME02.entrypoints=web,websecure\n        - traefik.http.routers.CHANGEME02.tls.certresolver=letsencrypt\n        - traefik.http.services.CHANGEME02.loadbalancer.server.port=80'),
(2, 'Nginx', 'networks:\n  traefik-proxy:\n    external: true\nservices:\n  test:\n    image: nginx:latest\n    networks:\n      - traefik-proxy\n    deploy:\n      labels:\n        - traefik.enable=true\n        - traefik.http.routers.CHANGEME01.rule=Host(`SUBDOMAIN01.kubelab.dk`)\n        - traefik.http.routers.CHANGEME01.entrypoints=web,websecure\n        - traefik.http.routers.CHANGEME01.tls.certresolver=letsencrypt\n        - traefik.http.services.CHANGEME01.loadbalancer.server.port=80');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `UserGroup`
--

CREATE TABLE `UserGroup` (
  `userId` int DEFAULT NULL,
  `groupId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `UserGroup`
--

INSERT INTO `UserGroup` (`userId`, `groupId`) VALUES
(18, 2),
(19, 2),
(20, 2),
(25, 4),
(26, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiredAt` date DEFAULT NULL,
  `roleId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `Users`
--

INSERT INTO `Users` (`id`, `firstName`, `lastName`, `email`, `password`, `createdAt`, `expiredAt`, `roleId`) VALUES
(18, 'Bawar', 'User', 'bawar@ucl.dk', '$2a$10$cdG1l.Yqw6WJIkxw8SpHNuzpea1EgruydpaTxm3lFBqIl5wxJnNpa', '2024-11-25 08:11:21', NULL, 1),
(19, 'Max', 'User', 'max@ucl.dk', '$2a$10$4oE6MrElRk8ZQSRx0BAaE.50jHBifXa6UnUJ31cwcwfL9Qd/pdDNW', '2024-11-25 08:15:58', NULL, 1),
(20, 'Mette', 'User', 'mette@ucl.dk', '$2a$10$/SUOketFXIo1GYHnjb/CveDDKc.bLSWQGD0OK3EoHAf2vfGu/a.WW', '2024-11-25 08:16:16', NULL, 1),
(25, 'Super', 'Admin', 'superadmin@ucl.dk', '$2a$10$pGsIOOnqdY2shjGdAsKG.umcuehoj9pgvNpQ3FnZ/ams3I6L9OcNm', '2024-12-18 09:27:51', NULL, 1),
(26, 'Peter', 'Plys', 'student@ucl.dk', '$2a$10$OX0oMGkrr1I9shCseKh30OcwhtA2LYKKLBRzgf87KBrtiqfuUt17q', '2024-12-18 09:28:11', NULL, 3);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `Configs`
--
ALTER TABLE `Configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `configKey` (`configKey`);

--
-- Indeks for tabel `Groups`
--
ALTER TABLE `Groups`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `Stacks`
--
ALTER TABLE `Stacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userId` (`userId`),
  ADD KEY `fk_stack_groupId` (`groupId`),
  ADD KEY `idx_portainer_stack_id` (`portainerStackId`),
  ADD KEY `fk_templateId` (`templateId`);

--
-- Indeks for tabel `Templates`
--
ALTER TABLE `Templates`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `UserGroup`
--
ALTER TABLE `UserGroup`
  ADD KEY `fk_UserGroup_userId` (`userId`),
  ADD KEY `fk_UserGroup_groupId` (`groupId`);

--
-- Indeks for tabel `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_roleId` (`roleId`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `Configs`
--
ALTER TABLE `Configs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Tilføj AUTO_INCREMENT i tabel `Groups`
--
ALTER TABLE `Groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tilføj AUTO_INCREMENT i tabel `Stacks`
--
ALTER TABLE `Stacks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- Tilføj AUTO_INCREMENT i tabel `Templates`
--
ALTER TABLE `Templates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `Stacks`
--
ALTER TABLE `Stacks`
  ADD CONSTRAINT `fk_stack_groupId` FOREIGN KEY (`groupId`) REFERENCES `Groups` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_templateId` FOREIGN KEY (`templateId`) REFERENCES `Templates` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrænsninger for tabel `UserGroup`
--
ALTER TABLE `UserGroup`
  ADD CONSTRAINT `fk_UserGroup_groupId` FOREIGN KEY (`groupId`) REFERENCES `Groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_UserGroup_userId` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrænsninger for tabel `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `fk_roleId` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
