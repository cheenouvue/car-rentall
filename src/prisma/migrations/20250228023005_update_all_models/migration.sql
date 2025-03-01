-- DropIndex
DROP INDEX `Car_bankId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_carTypeId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_insuranceId_fkey` ON `car`;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_carTypeId_fkey` FOREIGN KEY (`carTypeId`) REFERENCES `CarType`(`car_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurance`(`insurance_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`bank_id`) ON DELETE CASCADE ON UPDATE CASCADE;
