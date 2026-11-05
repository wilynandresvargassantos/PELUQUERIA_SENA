-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2026 a las 16:42:27
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
-- Base de datos: `bdpeluqueria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idcliente` int(11) NOT NULL,
  `tipoDocumento` varchar(3) NOT NULL,
  `numeroDocumento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idcliente`, `tipoDocumento`, `numeroDocumento`, `nombres`, `direccion`, `telefono`, `correo`, `contrasena`, `estado`) VALUES
(1, 'CC', '123456789', 'pepito perez', 'avenida siempre viva', '3012659435', 'pepito@gmail.com', '$2b$10$rfZZTlZdh.CdUVCbZ/243uAd5ksf7XzN6xBiOXjtTZqhWCnYurP7q', 'Activo'),
(2, '', '1098765432', 'Juan Perez', '', '3109876543', 'juan.perez@example.com', '$2b$10$t.oV/A0SlTxzNJCp0BCFu.jzHhgdT0vOWGLfEnYmzQPye02mWOWxa', 'Activo'),
(3, '', '1087654321', 'Pedro Pollos', '', '3119876543', 'pedro.pollos@example.com', '$2b$10$T7mLi3QehY1OPUPyEIHlQuEkVivHZAlXyhXPkbZNDVICbgmRmgPlq', 'Activo'),
(4, 'CC', '1098765001', 'Cliente Registrado Admin', 'Calle 10 # 20-30', '3112223344', 'cliente1.pelu@gmail.com', '$2b$10$vZ10aoHxH7qjocypYuWKfegLS6ZJIyCePpZvf7lpa4.H5qi59ObeO', 'Activo'),
(5, '', '1098765002', 'Cliente Autoregistro', '', '3154445566', 'cliente2.pelu@gmail.com', '$2b$10$AZR6Xbtu2F3sxS5EFtaCdOgYg8N.YUibsgEem.hWO85wipcQbHBmi', 'Activo'),
(6, 'CC', '1098765088', 'Cliente Autoregistro', '', '3154445566', 'cliente_nuevo@gmail.com', '$2b$10$J32kqbWObAwn/4ZL7OWkVukhRG.kVDf0HjhswwNvAxUY1kSmIvizO', 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `idHorario` int(11) NOT NULL,
  `fecha` varchar(10) NOT NULL,
  `horaInicio` varchar(10) NOT NULL,
  `horaFinal` varchar(10) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`idHorario`, `fecha`, `horaInicio`, `horaFinal`, `estado`) VALUES
(2, '2026-10-10', '8:00 am', '9:00 am', 'Inactivo'),
(3, '2026-10-10', '9:00 am', '10:00 am', 'Inactivo'),
(4, '2026-10-10', '10:00 am', '11:00 am', 'Inactivo'),
(5, '2026-10-10', '11:00 am', '12:00 m', 'Inactivo'),
(6, '2026-10-10', '1:00 pm', '2:00 pm', 'Inactivo'),
(7, '2026-10-10', '2:00 pm', '3:00 pm', 'Inactivo'),
(8, '2026-10-25', '4:00 pm', '5:00 pm', 'Activo'),
(9, '2026-10-10', '4:00 pm', '5:00 pm', 'Activo'),
(10, '2026-10-10', '5:30 pm', '6:30 pm', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reghorarios`
--

CREATE TABLE `reghorarios` (
  `idRegHorario` int(11) NOT NULL,
  `idHorario` int(11) NOT NULL,
  `idTrabajador` int(11) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reghorarios`
--

INSERT INTO `reghorarios` (`idRegHorario`, `idHorario`, `idTrabajador`, `estado`) VALUES
(2, 2, 1, 'Inactivo'),
(3, 3, 1, 'Inactivo'),
(4, 4, 1, 'Inactivo'),
(5, 5, 1, 'Inactivo'),
(6, 6, 1, 'Inactivo'),
(7, 7, 1, 'Inactivo'),
(8, 8, 1, 'Cancelada'),
(9, 10, 1, 'Cancelada'),
(10, 10, 1, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE `trabajadores` (
  `idtrabajador` int(11) NOT NULL,
  `tipoDocumento` varchar(3) NOT NULL,
  `numeroDocumento` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`idtrabajador`, `tipoDocumento`, `numeroDocumento`, `nombres`, `direccion`, `telefono`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, 'CC', '1012345678', 'Mario Barbero', 'Carrera 15 # 45-20', '3201234567', 'mario.barbero@example.com', '$2b$10$hN.TS6pEbIA2tpN04/TPpOkOyyJCa5mzUyeaRoQptWLww0InFtIgO', 'Trabajador', 'Activo'),
(3, 'CC', '100100100', 'SUTANITO', 'Av siempre viva', '3001111111', 'sutanito@gmail.com', '$2b$10$4KGTqiyE6hRzGaal/rxAR.1rBKI0ksc5nGGgc6BYzHA2cZ5OFHXhu', 'Admin', 'Activo'),
(4, 'CC', '1098765432', 'Carlos Santana Administrador', 'Calle 45 # 12-30', '3109876543', 'admin.carlos@gmail.com', '$2b$10$Okjj78zBHDt75jvwF0.CJe52vuTwxI.V0vDeYB5RGALpnSdRt7d9q', 'Admin', 'Activo'),
(5, 'CC', '1098765435', 'Segundo Admin Peluqueria', 'Calle 50 # 10-20', '3158765432', 'admin2.peluqueria@gmail.com', '$2b$10$3.EN5IoSU/cNlQMCSZE33.8Y/2mgW/n142BFeUGxJBKOy1xVJTgGe', 'Admin', 'Activo'),
(6, 'CC', '1098765004', 'David Fernando Estilista', 'Avenida 30 # 10-25', '3127778899', 'david.barbero@gmail.com', '$2b$10$c5GZEkqMP2ywErH2iju6l.T2rxfPHTXII8WBXLZ4lIRyPt7H4Z6lG', 'Trabajador', 'Activo'),
(7, 'CC', '1098765999', 'Carlos Administrador Principal', 'Calle 45 # 12-34', '3109998877', 'admin_carlos@peluqueria.com', '$2b$10$hvy6fBrpd2iaK3nMmzpt6uBNag7Iehz6/pOqGM8e1RTOmZfbML9Pa', 'Admin', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`idHorario`);

--
-- Indices de la tabla `reghorarios`
--
ALTER TABLE `reghorarios`
  ADD PRIMARY KEY (`idRegHorario`),
  ADD KEY `idHorario` (`idHorario`),
  ADD KEY `idTrabajador` (`idTrabajador`);

--
-- Indices de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`idtrabajador`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `idHorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `reghorarios`
--
ALTER TABLE `reghorarios`
  MODIFY `idRegHorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `idtrabajador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reghorarios`
--
ALTER TABLE `reghorarios`
  ADD CONSTRAINT `reghorarios_ibfk_1` FOREIGN KEY (`idHorario`) REFERENCES `horarios` (`idHorario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reghorarios_ibfk_2` FOREIGN KEY (`idTrabajador`) REFERENCES `trabajadores` (`idtrabajador`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
