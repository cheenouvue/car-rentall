/*
  Warnings:

  - Added the required column `dri_icenes` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Car_carTypeId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Car_insuranceId_fkey` ON `car`;

-- DropIndex
DROP INDEX `Employees_dept_id_fkey` ON `employees`;

-- DropIndex
DROP INDEX `Rental_bankId_fkey` ON `rental`;

-- DropIndex
DROP INDEX `Rental_carId_fkey` ON `rental`;

-- DropIndex
DROP INDEX `Rental_employeesId_fkey` ON `rental`;

-- DropIndex
DROP INDEX `Rental_usersId_fkey` ON `rental`;

-- DropIndex
DROP INDEX `Review_carId_fkey` ON `review`;

-- DropIndex
DROP INDEX `Review_emplyId_fkey` ON `review`;

-- AlterTable
ALTER TABLE `rental` ADD COLUMN `dri_icenes` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Employees` ADD CONSTRAINT `Employees_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_carTypeId_fkey` FOREIGN KEY (`carTypeId`) REFERENCES `CarType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `Rental`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_emplyId_fkey` FOREIGN KEY (`emplyId`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `Rental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_employeesId_fkey` FOREIGN KEY (`employeesId`) REFERENCES `Employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
