/*
  Warnings:

  - You are about to drop the column `bank_id` on the `car` table. All the data in the column will be lost.
  - Added the required column `bankId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Car_bank_id_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_carTypeId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_insuranceId_fkey` ON `car`;

-- AlterTable
ALTER TABLE `car` DROP COLUMN `bank_id`,
    ADD COLUMN `bankId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_carTypeId_fkey` FOREIGN KEY (`carTypeId`) REFERENCES `CarType`(`car_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurance`(`insurance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`bank_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
