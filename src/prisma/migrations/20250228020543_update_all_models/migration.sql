/*
  Warnings:

  - Added the required column `bank_id` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Car_carTypeId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_insuranceId_fkey` ON `car`;

-- AlterTable
ALTER TABLE `car` ADD COLUMN `bank_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_carTypeId_fkey` FOREIGN KEY (`carTypeId`) REFERENCES `CarType`(`car_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurance`(`insurance_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `Bank`(`bank_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
