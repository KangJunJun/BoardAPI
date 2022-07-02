CREATE DATABASE board_db default CHARACTER SET UTF8; 

USE board_db;

CREATE TABLE `board` (
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `writer` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `board_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `comment` (
  `comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `writer` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `board_id` int NOT NULL,
  `isDelete` tinyint NOT NULL DEFAULT '0',
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK_77a3101cc141a4046264ce59d6d` (`board_id`),
  CONSTRAINT `FK_77a3101cc141a4046264ce59d6d` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(40) NOT NULL,
  `user` varchar(20) NOT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
