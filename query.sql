CREATE DATABASE board_db default CHARACTER SET UTF8; 

USE board_db

CREATE TABLE `user` (
   `user_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
   `uuid` VARCHAR(40) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `name` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `email` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `password` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `last_login_date` DATETIME NULL DEFAULT NULL,
   `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`user_id`)
);

CREATE TABLE `board` (
   `board_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
   `title` VARCHAR(200) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `content` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `writer` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `password` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`board_id`)
);

CREATE TABLE `comment` (
   `comment_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
   `board_id`  BIGINT(20) UNSIGNED NOT NULL,
   `parent_id`  BIGINT(20) UNSIGNED NULL,
   `depth`  BIGINT(20) NOT NULL,
   `isDelete` BOOLEAN NOT NULL DEFAULT 0,
   `comment` VARCHAR(500) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `writer` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `password` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_520_ci',
   `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`comment_id`),
   CONSTRAINT `fk_board_id` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON UPDATE CASCADE,
   CONSTRAINT `fk_comment_id` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`) ON UPDATE CASCADE
);