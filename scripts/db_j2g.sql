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
-- Table `db_j2g`.`tb_company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company` (
  `company_id` INT NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NOT NULL,
  `company_tax_id` VARCHAR(14) NOT NULL,
  `company_login` VARCHAR(200) NOT NULL,
  `company_password` VARCHAR(100) NOT NULL,
  `company_isActive` TINYINT NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE INDEX `company_id_UNIQUE` (`company_id` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`company_login` ASC) VISIBLE,
  UNIQUE INDEX `cnpj_UNIQUE` (`company_tax_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_company_phone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company_phone` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company_phone` (
  `company_phone_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `company_phone` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`company_phone_id`, `company_id`),
  INDEX `fk_number_company_idx` (`company_id` ASC) VISIBLE,
  CONSTRAINT `fk_number_company`
    FOREIGN KEY (`company_id`)
    REFERENCES `db_j2g`.`tb_company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_company_email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company_email` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company_email` (
  `company_emai_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `company_email` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`company_emai_id`, `company_id`),
  INDEX `fk_email_company1_idx` (`company_id` ASC) VISIBLE,
  CONSTRAINT `fk_email_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `db_j2g`.`tb_company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_company_address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company_address` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company_address` (
  `company_address_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `company_address_municipality` VARCHAR(15) NULL,
  `company_address_street` VARCHAR(150) NULL,
  `company_address_number` VARCHAR(15) NULL,
  `company_address_detals` VARCHAR(70) NULL,
  `company_address_district` VARCHAR(45) NULL,
  `company_address_city` VARCHAR(150) NULL,
  `company_address_state` VARCHAR(5) NULL,
  `company_address_zip` VARCHAR(15) NULL,
  `company_address_coutry` VARCHAR(60) NULL,
  `company_address_isDelete` TINYINT NULL,
  PRIMARY KEY (`company_address_id`, `company_id`),
  INDEX `fk_tb_company_address_tb_company1_idx` (`company_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_company_address_tb_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `db_j2g`.`tb_company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_company_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company_user` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company_user` (
  `company_user_id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `company_user_login` VARCHAR(45) NULL,
  `company_user_password` VARCHAR(45) NULL,
  `company_user_type` VARCHAR(45) NULL,
  PRIMARY KEY (`company_user_id`, `company_id`),
  INDEX `fk_tb_company_user_tb_company1_idx` (`company_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_company_user_tb_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `db_j2g`.`tb_company` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
