-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2024 a las 18:02:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `swaply_bbdd`
--
CREATE DATABASE IF NOT EXISTS `swaply_bbdd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `swaply_bbdd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`ID`, `Nombre`) VALUES
(1, 'Decoracion'),
(2, 'Electrodomesticos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL,
  `Usuario1_ID` int(11) NOT NULL,
  `ProductoID` int(11) NOT NULL,
  `Usuario2_ID` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `chats`
--

INSERT INTO `chats` (`ID`, `Usuario1_ID`, `ProductoID`, `Usuario2_ID`, `Fecha`) VALUES
(5, 2, 36, 1, '2024-08-01 14:25:19'),
(9, 1, 4, 2, '2024-08-01 14:25:19'),
(10, 7, 1, 1, '2024-08-01 14:25:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `ID` int(11) NOT NULL,
  `ProductoID` int(11) DEFAULT NULL,
  `UsuarioID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`ID`, `ProductoID`, `UsuarioID`) VALUES
(1, 36, 2),
(2, 1, 7),
(3, 3, 2),
(4, 4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intercambios`
--

CREATE TABLE `intercambios` (
  `ID` int(11) NOT NULL,
  `DonanteID` int(11) NOT NULL,
  `ProductoID` int(11) NOT NULL,
  `ReceptorID` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `intercambios`
--

INSERT INTO `intercambios` (`ID`, `DonanteID`, `ProductoID`, `ReceptorID`, `Fecha`) VALUES
(6, 1, 36, 2, '2024-07-31 16:03:39'),
(7, 1, 36, 2, '2024-08-01 12:48:53'),
(8, 1, 36, 2, '2024-08-01 12:49:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `ID` int(11) NOT NULL,
  `ChatID` int(11) NOT NULL,
  `UsuarioID` int(11) NOT NULL,
  `Contenido` varchar(1000) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`ID`, `ChatID`, `UsuarioID`, `Contenido`, `Fecha`) VALUES
(1, 5, 2, 'hola que tal a cuanto se vende?', '2024-07-26 13:55:27'),
(3, 5, 1, '500 euros', '2024-07-26 13:59:44'),
(4, 5, 1, 'pepe', '2024-07-30 16:49:03'),
(5, 5, 1, 'pepe', '2024-07-30 17:26:59'),
(6, 10, 7, 'ola', '2024-08-01 14:35:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID` int(11) NOT NULL,
  `UsuarioID` int(11) DEFAULT NULL,
  `CategoriaID` int(11) DEFAULT NULL,
  `FechaPublicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Titulo` varchar(255) DEFAULT NULL,
  `EstadoProducto` varchar(255) DEFAULT NULL,
  `Descripcion` text DEFAULT NULL,
  `Imagenes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Imagenes`)),
  `ProductoReservado` enum('Disponible','Reservado','Entregado') DEFAULT 'Disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID`, `UsuarioID`, `CategoriaID`, `FechaPublicacion`, `Titulo`, `EstadoProducto`, `Descripcion`, `Imagenes`, `ProductoReservado`) VALUES
(1, 1, 1, '2024-07-18 14:13:23', 'Mesa Rara', 'Nuevo', 'Mesa cuadrada de color mostaza', '\"[\\\"1722257782-91FycrLFKUL._AC_UF894,1000_QL80_.jpg\\\"]\"', ''),
(3, 1, 2, '2024-07-18 15:16:56', 'Television', 'Usado', 'Television de color azul usada', NULL, ''),
(4, 2, 1, '2024-07-22 10:51:05', 'Mesa Cuadrada', 'Nuevo', 'Mesa cuadrada de color mostaza', NULL, 'Reservado'),
(36, 1, 1, '2024-07-24 13:18:11', 'NOse', 'Muy Usado', 'Esta totalmente inservible', NULL, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicaciones`
--

CREATE TABLE `ubicaciones` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ubicaciones`
--

INSERT INTO `ubicaciones` (`ID`, `Nombre`) VALUES
(1, 'Barcelona'),
(2, 'Madrid');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `correoelectronico` varchar(255) DEFAULT NULL,
  `NombreUsuario` varchar(255) DEFAULT NULL,
  `Recibidos` int(11) DEFAULT 0,
  `Password` varchar(255) DEFAULT NULL,
  `FotoPerfil` varchar(255) DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Regalos` int(11) DEFAULT 0,
  `UbicacionID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `correoelectronico`, `NombreUsuario`, `Recibidos`, `Password`, `FotoPerfil`, `Token`, `Regalos`, `UbicacionID`) VALUES
(1, 'pepito@gmail.com', 'Pepito', 0, '$2a$12$Y.1DZUHpBwlMjXLCqDls3ur3iFWS6x/9ex9uo2MRSmSr2jQ80oq1W', NULL, NULL, 5, 1),
(2, 'naimvitale@gmail.com', 'NaimVitale', 5, '$2a$12$pcSL5iEZ1yinrLwsrMZoJuZg9dP22Fv6XyzXS.KEMykPAFGxWg5Vu', NULL, '2f94ee2967cb6425fba4f078f41d3f7115bef2c93349bb1afb925668f6570d22', 0, 2),
(7, 'pepinho@gmail.com', 'Pepino', 0, '$2y$12$br09gEZJPIaPuhhhN0f7GOsij9l1ZihRVr1CTi6ZUBKTFnKh4rS6K', 'sinportada.jpg', NULL, 0, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Usuario1_ID` (`Usuario1_ID`),
  ADD KEY `ProductoID` (`ProductoID`),
  ADD KEY `Usuario2_ID` (`Usuario2_ID`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProductoID` (`ProductoID`),
  ADD KEY `UsuarioID` (`UsuarioID`);

--
-- Indices de la tabla `intercambios`
--
ALTER TABLE `intercambios`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DonanteID` (`DonanteID`),
  ADD KEY `ProductoID` (`ProductoID`),
  ADD KEY `ReceptorID` (`ReceptorID`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `ChatID` (`ChatID`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UsuarioID` (`UsuarioID`),
  ADD KEY `CategoriaID` (`CategoriaID`);

--
-- Indices de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `correoelectronico` (`correoelectronico`),
  ADD KEY `fk_ubicacion` (`UbicacionID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `intercambios`
--
ALTER TABLE `intercambios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_4` FOREIGN KEY (`Usuario1_ID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_5` FOREIGN KEY (`Usuario2_ID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_6` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `favoritos_ibfk_3` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `intercambios`
--
ALTER TABLE `intercambios`
  ADD CONSTRAINT `intercambios_ibfk_1` FOREIGN KEY (`DonanteID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `intercambios_ibfk_2` FOREIGN KEY (`ReceptorID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `intercambios_ibfk_3` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ID`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_3` FOREIGN KEY (`ChatID`) REFERENCES `chats` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_4` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`ID`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_ubicacion` FOREIGN KEY (`UbicacionID`) REFERENCES `ubicaciones` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
