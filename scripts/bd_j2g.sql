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
-- Table `db_j2g`.`tb_customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_tax_id` VARCHAR(14) NOT NULL,
  `customer_login` VARCHAR(200) NOT NULL,
  `customer_password` VARCHAR(100) NOT NULL,
  `customer_isActive` TINYINT NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `company_id_UNIQUE` (`customer_id` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`customer_login` ASC) VISIBLE,
  UNIQUE INDEX `cnpj_UNIQUE` (`customer_tax_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_customer_phone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer_phone` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer_phone` (
  `customer_phone_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `customer_phone` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`customer_phone_id`, `customer_id`),
  INDEX `fk_number_company_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_number_company`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_j2g`.`tb_customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_customer_email`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer_email` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer_email` (
  `customer_emaiL_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `customer_email` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`customer_emaiL_id`, `customer_id`),
  INDEX `fk_email_company1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_email_company1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_j2g`.`tb_customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_customer_address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer_address` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer_address` (
  `customer_address_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `customer_address_municipality` VARCHAR(15) NOT NULL,
  `customer_address_street` VARCHAR(150) NOT NULL,
  `company_address_number` VARCHAR(15) NOT NULL,
  `customer_address_detals` VARCHAR(70) NOT NULL,
  `customer_address_district` VARCHAR(45) NOT NULL,
  `customer_address_city` VARCHAR(150) NOT NULL,
  `customer_address_state` VARCHAR(5) NOT NULL,
  `customer_address_zip` VARCHAR(15) NOT NULL,
  `customer_address_coutry` VARCHAR(60) NOT NULL,
  `customer_address_isDelete` TINYINT NOT NULL,
  PRIMARY KEY (`customer_address_id`, `customer_id`),
  INDEX `fk_tb_company_address_tb_company1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_company_address_tb_company1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_j2g`.`tb_customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_customer_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer_user` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer_user` (
  `customer_user_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `customer_user_login` VARCHAR(45) NULL,
  `customer_user_password` VARCHAR(45) NULL,
  `customer_user_type` VARCHAR(45) NULL,
  PRIMARY KEY (`customer_user_id`, `customer_id`),
  INDEX `fk_tb_company_user_tb_company1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_company_user_tb_company1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_j2g`.`tb_customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_customer_company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_customer_company` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_customer_company` (
  `customer_company_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`customer_company_id`, `customer_id`),
  INDEX `fk_tb_customer_company_tb_customer1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_customer_company_tb_customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `db_j2g`.`tb_customer` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_j2g`.`tb_company_Field`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_j2g`.`tb_company_Field` ;

CREATE TABLE IF NOT EXISTS `db_j2g`.`tb_company_Field` (
  `company_Field_id` INT NOT NULL,
  `cutomer_company_field_id` INT NOT NULL,
  PRIMARY KEY (`company_Field_id`, `cutomer_company_field_id`),
  INDEX `fk_tb_company_Field_tb_customer_company1_idx` (`cutomer_company_field_id` ASC) VISIBLE,
  CONSTRAINT `fk_tb_company_Field_tb_customer_company1`
    FOREIGN KEY (`cutomer_company_field_id`)
    REFERENCES `db_j2g`.`tb_customer_company` (`customer_company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
