-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-08-2024 a las 19:13:15
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
(1, 'Ropa'),
(2, 'Informática'),
(3, 'Calzado'),
(4, 'Hogar'),
(5, 'Jardín'),
(6, 'Cocina'),
(7, 'Iluminación'),
(8, 'Deportes'),
(9, 'Cine'),
(10, 'Libros'),
(11, 'Videojuegos y Consolas'),
(12, 'Electrodomésticos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL,
  `Usuario1_ID` int(11) NOT NULL,
  `ProductoID` int(11) NOT NULL,
  `Usuario2_ID` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `UltimoMensaje` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `ID` int(11) NOT NULL,
  `ProductoID` int(11) DEFAULT NULL,
  `UsuarioID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(12, 3, 1, '2024-08-02 15:26:51', 'Reloj classico negro', 'usado', 'Reloj clásico negro. Le falta reparación, pero es muy bonito y elegante. Viene con pila y caja original. ¡Chat para quien lo quiera!', '\"[\\\"1722612411-Captura de pantalla 2024-08-02 172552.jpg\\\",\\\"1722612411-Captura de pantalla 2024-08-02 172615.jpg\\\",\\\"1722612411-Captura de pantalla 2024-08-02 172635.jpg\\\"]\"', 'Disponible'),
(13, 3, 12, '2024-08-02 15:33:29', 'Lavadora', 'usado', 'Lavadora completamente funcional. Se tiene que tirar por falta de espacio. \r\nViene con libro de uso, instrucciones. Hay que venir a buscarla.', '\"[\\\"1722612809-Captura de pantalla 2024-08-02 173229.jpg\\\",\\\"1722612809-Captura de pantalla 2024-08-02 173243.jpg\\\",\\\"1722612809-Captura de pantalla 2024-08-02 173258.jpg\\\"]\"', 'Disponible'),
(14, 3, 2, '2024-08-02 15:36:02', 'Ordenador Portatil', 'usado', 'Ordenador portátil totalmente funcional. Tiene ya unos años, pero no quiero tirarlo. Si alguien quiere aprovecharlo es suyo.', '\"[\\\"1722612962-Captura de pantalla 2024-08-02 173527.jpg\\\",\\\"1722612962-Captura de pantalla 2024-08-02 173537.jpg\\\",\\\"1722612981-Captura de pantalla 2024-08-02 173514.jpg\\\"]\"', 'Disponible'),
(15, 3, 11, '2024-08-02 15:39:17', 'Nintendo DS', 'nuevo', 'Nintendo DS sin usar. Se ha quedado en la caja desde que la compre hace muchos años. Quiero quitármela de encima y que alguien la disfrute.', '\"[\\\"1722613157-Captura de pantalla 2024-08-02 173756.jpg\\\",\\\"1722613157-Captura de pantalla 2024-08-02 173825.jpg\\\",\\\"1722613157-Captura de pantalla 2024-08-02 173811.jpg\\\"]\"', 'Disponible'),
(16, 3, 11, '2024-08-02 15:41:35', 'Set de Videojuegos PC de los 2000', 'usado', 'Set de videojuegos de los 2000. Se tienen que venir a buscar. La mayoría funciona pero no los he probado todos.', '\"[\\\"1722613295-102644695.jpg\\\",\\\"1722613295-102644695.jpg\\\"]\"', 'Disponible'),
(17, 3, 2, '2024-08-02 15:44:42', 'Cargador usb-C para móvil', 'usado', 'Cargador rápido USB-C para móvil android.', '\"[\\\"1722613482-Cable-de-Datos-Original-de-1M-Apple-iPhone-6-7-8-X-Presentacion-Retail-MD818-2.jpg\\\",\\\"1722613482-descarga.jfif\\\"]\"', 'Disponible'),
(18, 3, 7, '2024-08-02 15:47:38', 'Lámpara de salón', 'nuevo', 'Lámpara alta de salón. Se tiene que venir a buscar. Muy poco uso y en perfecto estado. Le faltan las bombillas.', '\"[\\\"1722613658-Captura de pantalla 2024-08-02 174703.jpg\\\",\\\"1722613658-Captura de pantalla 2024-08-02 174717.jpg\\\"]\"', 'Disponible'),
(19, 3, 4, '2024-08-02 15:50:24', 'Sofá cama', 'usado', 'Sofá cama muy usado. Se tiene que venir a buscar. Tiene algunos arañazos de gato en la parte inferior. Se puede abrir y utilizar como cama perfectamente.', '\"[\\\"1722613824-Captura de pantalla 2024-08-02 174947.jpg\\\",\\\"1722613824-Captura de pantalla 2024-08-02 174937.jpg\\\",\\\"1722613824-Captura de pantalla 2024-08-02 174959.jpg\\\"]\"', 'Disponible'),
(20, 3, 6, '2024-08-02 15:52:33', 'Olla cocina', 'nuevo', 'Olla de cocina nueva. No se ha utilizado.', '\"[\\\"1722613953-Captura de pantalla 2024-08-02 175130.jpg\\\",\\\"1722613953-Captura de pantalla 2024-08-02 175119.jpg\\\"]\"', 'Disponible'),
(21, 3, 5, '2024-08-02 15:54:54', 'Gnomo de Jardín', 'usado', 'Un gnomo de jardín típico. Lo regalo ya que por la noche se despierta y me asusta por la ventana. Espero que no me persiga una vez nos separemos.', '\"[\\\"1722614094-Captura de pantalla 2024-08-02 175428.jpg\\\",\\\"1722614094-Captura de pantalla 2024-08-02 175405.jpg\\\"]\"', 'Disponible'),
(22, 4, 8, '2024-08-02 15:58:33', 'Pies de gato', 'nuevo', 'Talla 38. Una puesta. Precio original 30 €. Comprado hace 4 meses. Como no los utilizo los regalo.', '\"[\\\"1722614313-Captura de pantalla 2024-08-02 175727.jpg\\\",\\\"1722614313-Captura de pantalla 2024-08-02 175739.jpg\\\",\\\"1722614313-Captura de pantalla 2024-08-02 175751.jpg\\\"]\"', 'Disponible'),
(23, 4, 9, '2024-08-02 16:01:32', 'Set de VHS', 'usado', 'Buen estado. VHS Español. Usados y alguna caja rota.', '\"[\\\"1722614492-Captura de pantalla 2024-08-02 175925.jpg\\\"]\"', 'Disponible'),
(24, 4, 3, '2024-08-02 16:03:33', 'Chanclas Niñ@', 'usado', 'Chanclas de playa para niños. Se han usado durante dos veranos, muy poco. Estan como nuevas.', '\"[\\\"1722614613-chanclas-dedo-rosas-unicornio-create-dreams (1).jpg\\\",\\\"1722614613-chanclas-dedo-rosas-unicornio-create-dreams.jpg\\\"]\"', 'Disponible'),
(25, 4, 1, '2024-08-02 16:05:55', 'Reloj Casio digital', 'usado', 'Reloj Casio digital, llevado durante años aunque sigue funcionando perfectamente. Me compro otro por esto lo regalo.', '\"[\\\"1722614755-Captura de pantalla 2024-08-02 180422.jpg\\\"]\"', 'Disponible'),
(26, 4, 12, '2024-08-02 16:08:24', 'Set 2 ventiladores', 'usado', 'Set de 2 ventiladores de mesa, blancos con aspas de color gris oscuro, totalmente funcionales (tengo vídeo), enchufe Schuko, ligeramente polvorientos, potencia y medidas en la imagen.', '\"[\\\"1722614904-Captura de pantalla 2024-08-02 180711.jpg\\\",\\\"1722614904-Captura de pantalla 2024-08-02 180726.jpg\\\",\\\"1722614904-Captura de pantalla 2024-08-02 180739.jpg\\\",\\\"1722614904-Captura de pantalla 2024-08-02 180757.jpg\\\"]\"', 'Disponible'),
(27, 4, 1, '2024-08-02 16:11:22', 'Pantalón Baggy años 2000s', 'usado', 'Pantalon Baggy Roca wear años 2000s. Usado con frecuencia durante este tiempo. Alguna marca de uso.', '\"[\\\"1722615082-Captura de pantalla 2024-08-02 181031.jpg\\\",\\\"1722615082-Captura de pantalla 2024-08-02 181042.jpg\\\",\\\"1722615082-Captura de pantalla 2024-08-02 181057.jpg\\\"]\"', 'Disponible'),
(28, 4, 8, '2024-08-02 16:13:13', 'Camiseta Deporte Adidas', 'usado', 'Camiseta deporte Adidas. 9-10 años. 140.', '\"[\\\"1722615193-Captura de pantalla 2024-08-02 181237.jpg\\\",\\\"1722615193-Captura de pantalla 2024-08-02 181254.jpg\\\"]\"', 'Disponible'),
(29, 4, 3, '2024-08-02 16:16:22', 'Zapatos New Balance', 'nuevo', '43 · New Balance · Rojo y Blanco · Como nuevo. Usadas muy pocas veces.', '\"[\\\"1722615382-Captura de pantalla 2024-08-02 181450.jpg\\\",\\\"1722615382-Captura de pantalla 2024-08-02 181503.jpg\\\",\\\"1722615382-Captura de pantalla 2024-08-02 181515.jpg\\\"]\"', 'Disponible'),
(30, 4, 11, '2024-08-02 16:18:48', 'Mando Xbox', 'usado', 'Mando xbox, tiene una pequeña imperfección en el joystick derecho, pero permite jugar sin problemas.', '\"[\\\"1722615528-Captura de pantalla 2024-08-02 181723.jpg\\\",\\\"1722615528-Captura de pantalla 2024-08-02 181733.jpg\\\",\\\"1722615528-Captura de pantalla 2024-08-02 181745.jpg\\\"]\"', 'Disponible'),
(31, 4, 5, '2024-08-02 16:21:15', 'Piscina inchable', 'nuevo', 'Se ha usado una sola vez. Piscina hinchable como nueva con muy poco uso y fácil de usar.', '\"[\\\"1722615675-Captura de pantalla 2024-08-02 181932.jpg\\\"]\"', 'Disponible'),
(32, 5, 9, '2024-08-02 16:33:45', 'El Padrino VHS', 'usado', 'VHS del padrino en Versión original y subtitulada en inglés. Se ve perfectamente.', '\"[\\\"1722616425-107669283.jpg\\\",\\\"1722616425-107669283_76853600.jpg\\\"]\"', 'Disponible'),
(33, 5, 9, '2024-08-02 16:37:09', 'Pantalla para proyector', 'usado', 'Pantalla Tectake manual enrollable para techo o pared para proyector compatible con HD, 1080p, 4k, 3D. Usada. Vendo por cambio por una más grande. Proyector DLP y LCD – optimizada para HDTV\r\nBordes laterales y parte trasera de color negro para un alto contraste', '\"[\\\"1722616629-Captura de pantalla 2024-08-02 183520.jpg\\\",\\\"1722616629-Captura de pantalla 2024-08-02 183531.jpg\\\",\\\"1722616629-Captura de pantalla 2024-08-02 183546.jpg\\\"]\"', 'Disponible'),
(34, 5, 10, '2024-08-02 16:42:31', 'Diccionario Ingés Catalán', 'usado', 'diccionario vox de lengua catalana y de ingles en buen estado', '\"[\\\"1722616951-Captura de pantalla 2024-08-02 184157.jpg\\\",\\\"1722616951-Captura de pantalla 2024-08-02 184142.jpg\\\"]\"', 'Disponible'),
(35, 5, 10, '2024-08-02 16:47:41', 'Libros de la tierra media, El señor de los anillos', 'usado', 'Los 3 libros del señor de los anillos + el silmarillion + los hijos de hurin + el Hobbit.', '\"[\\\"1722617261-Captura de pantalla 2024-08-02 184624.jpg\\\"]\"', 'Disponible'),
(36, 5, 2, '2024-08-02 16:52:13', 'Ratón gamer', 'usado', 'Ratón gamer ordenador. Perfecto para jugar. 6000 Dpi. Luces led personalizables.', '\"[\\\"1722617533-Captura de pantalla 2024-08-02 185121.jpg\\\",\\\"1722617533-Captura de pantalla 2024-08-02 185134.jpg\\\",\\\"1722617533-Captura de pantalla 2024-08-02 185147.jpg\\\"]\"', 'Disponible'),
(37, 5, 7, '2024-08-02 16:54:37', 'Lámpara Rosa', 'usado', 'Lámpara rosa de IKEA. Pequeña.', '\"[\\\"1722617677-Captura de pantalla 2024-08-02 185356.jpg\\\"]\"', 'Disponible'),
(38, 5, 4, '2024-08-02 16:57:21', 'Mesita de noche', 'usado', 'mesita de noche antigua. Muy usada pero aún funcional. Se tiene que venir a buscar.', '\"[\\\"1722617841-Captura de pantalla 2024-08-02 185632.jpg\\\",\\\"1722617841-Captura de pantalla 2024-08-02 185644.jpg\\\",\\\"1722617841-Captura de pantalla 2024-08-02 185655.jpg\\\"]\"', 'Disponible'),
(39, 5, 12, '2024-08-02 16:59:52', 'Radio', 'usado', 'Radio antigua. Aún funciona sin problema. Se oye bien. Bastante uso.', '\"[\\\"1722617992-Captura de pantalla 2024-08-02 185914.jpg\\\",\\\"1722617992-Captura de pantalla 2024-08-02 185926.jpg\\\"]\"', 'Disponible'),
(40, 6, 4, '2024-08-02 17:03:46', 'Cama doble', 'usado', 'No viene con matalaso. Bastante usado pero en perfecto estado.', '\"[\\\"1722618226-Captura de pantalla 2024-08-02 190209.jpg\\\",\\\"1722618226-Captura de pantalla 2024-08-02 190222.jpg\\\",\\\"1722618226-Captura de pantalla 2024-08-02 190235.jpg\\\"]\"', 'Disponible'),
(41, 6, 4, '2024-08-02 17:05:35', 'Mesa auxiliar', 'usado', 'Mesita alta auxiliar restaurada con sobre de cristal. 117cm largo, 34cm ancho y 78cm alto.', '\"[\\\"1722618335-Captura de pantalla 2024-08-02 190519.jpg\\\"]\"', 'Disponible');

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
(2, 'Tarragona'),
(3, 'Lleida'),
(4, 'Girona'),
(5, 'Zaragoza'),
(6, 'Madrid'),
(7, 'Oviedo'),
(8, 'Bilbao'),
(9, 'Vigo');

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
(1, 'adrialopezr@gmail.com', 'Sonlo', 0, '$2y$12$17wLQsG2Ga8bXvmmtuEGrOqaAwNpDUeRd4IEtLa4bm4cM6idP.DBG', 'magopetit-removebg-preview.png', '142c7af900eebfae4e578b5ba094bb3cf1d3c917cd6b00cf726bfe62a570c8ec', 0, 1),
(2, 'young@admin.com', 'young', 0, '$2y$12$rZkrQTyHC5fQedBDZPFuZOl1LkuCjw5z/dE1nVdFCKBGo1Z/Txk9a', 'Captura de pantalla 2024-07-01 160922.png', '5b5fc75c5585babc0d84fa150b1fe374220b6e3529efa331589fb5dbcdb44752', 0, 1),
(3, 'aren@gmail.com', 'Aren', 0, '$2y$12$ltdPShDximyKpiupUpPM5eyeU9qTbSuD2hFSzc6sPSWeRm58vt1Be', 'pexels-photo-2379005.jpeg', 'ae1e20f7fc747e032e92785ff2ed2ac11153513b1f58deb80d7f7d8467be8fd9', 0, 1),
(4, 'naim@gmail.com', 'naim', 0, '$2y$12$aqPkAUjLZg8y3KDbZS5ScO0.SIfFZU6Uc2/TgL/.8QbvBifTeC4iu', 'pexels-photo-1222271.jpeg', 'c96afedc22c11748fae8ab5ebc9e5f7b81c82fd6671759a481290446b5e1c1b0', 0, 3),
(5, 'arch@gmail.com', 'Arch Stanton', 0, '$2y$12$dRL4kw0JJ5mN1xMxgwywA.DUDqnJOKIBUeKV/.TZtUphG73pYPF8C', 'Arch_Stanton_dvd.original.jpg', '34f5b75184a5b2ff1c82414c64bd99bc9f7748a0176aabf06fc934f62d72ec78', 0, 2),
(6, 'adria@gmail.com', 'adrià', 0, '$2y$12$WyzzREwgNowVZe1SE0eYhufKRS9EeRFd20g9yzYIuCqdXtTmQW1NS', 'adria.PNG', '8b8e17e1bc5379134d5f1f10115e180beb698318b9df861ddb75d889262de466', 0, 4);

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `intercambios`
--
ALTER TABLE `intercambios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `ubicaciones`
--
ALTER TABLE `ubicaciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
