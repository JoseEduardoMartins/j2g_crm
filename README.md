# j2g_crm

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_j2g
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_j2g
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_j2g` DEFAULT CHARACTER SET utf8 ;
USE `db_j2g` ;

-- -----------------------------------------------------
-- Table `db_j2g`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`company` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`company` (
  `id_company` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `login` VARCHAR(200) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `isActive` TINYINT NOT NULL,
  PRIMARY KEY (`id_company`),
  UNIQUE INDEX `company_id_UNIQUE` (`id_company` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE,
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`number`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`number` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`number` (
  `id_number` INT NOT NULL AUTO_INCREMENT,
  `id_company` INT NOT NULL,
  `number` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`id_number`, `id_company`),
  INDEX `fk_number_company_idx` (`id_company` ASC) VISIBLE,
  CONSTRAINT `fk_number_company`
    FOREIGN KEY (`id_company`)
    REFERENCES `db_j2g`.`company` (`id_company`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`email` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`email` (
  `id_email` INT NOT NULL AUTO_INCREMENT,
  `id_company` INT NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id_email`, `id_company`),
  INDEX `fk_email_company1_idx` (`id_company` ASC) VISIBLE,
  CONSTRAINT `fk_email_company1`
    FOREIGN KEY (`id_company`)
    REFERENCES `db_j2g`.`company` (`id_company`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
