/*
  Warnings:

  - You are about to drop the column `statu` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_cartypetocar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_insurancetocar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insurance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cartypetocar` DROP FOREIGN KEY `_CarTypeToCar_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartypetocar` DROP FOREIGN KEY `_CarTypeToCar_B_fkey`;

-- DropForeignKey
ALTER TABLE `_insurancetocar` DROP FOREIGN KEY `_InsuranceToCar_A_fkey`;

-- DropForeignKey
ALTER TABLE `_insurancetocar` DROP FOREIGN KEY `_InsuranceToCar_B_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `statu`;

-- DropTable
DROP TABLE `_cartypetocar`;

-- DropTable
DROP TABLE `_insurancetocar`;

-- DropTable
DROP TABLE `bank`;

-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `cartype`;

-- DropTable
DROP TABLE `insurance`;
