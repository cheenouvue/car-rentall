-- AlterTable
ALTER TABLE `users` ADD COLUMN `statu` ENUM('ban', 'normal') NOT NULL DEFAULT 'normal';
