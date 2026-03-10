CREATE DATABASE IF NOT EXISTS ledgeraxis;
USE ledgeraxis;

CREATE TABLE IF NOT EXISTS tenants (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_tenants_status (status),
  KEY idx_tenants_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  tenant_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'viewer') NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_tenant_id (tenant_id),
  KEY idx_users_role (role),
  CONSTRAINT fk_users_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS companies (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  tenant_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) NOT NULL,
  industry VARCHAR(120) NOT NULL,
  revenue DECIMAL(18, 2) NOT NULL DEFAULT 0,
  employee_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_companies_registration_number (registration_number),
  KEY idx_companies_tenant_id (tenant_id),
  KEY idx_companies_tenant_name (tenant_id, name),
  KEY idx_companies_tenant_industry (tenant_id, industry),
  KEY idx_companies_tenant_revenue (tenant_id, revenue),
  CONSTRAINT fk_companies_tenant
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS directors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  nationality VARCHAR(120) NOT NULL,
  birth_year SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  KEY idx_directors_full_name (full_name),
  KEY idx_directors_nationality (nationality)
);

CREATE TABLE IF NOT EXISTS company_directors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  company_id BIGINT UNSIGNED NOT NULL,
  director_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_company_director (company_id, director_id),
  KEY idx_company_directors_company_id (company_id),
  KEY idx_company_directors_director_id (director_id),
  CONSTRAINT fk_company_directors_company
    FOREIGN KEY (company_id) REFERENCES companies(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_company_directors_director
    FOREIGN KEY (director_id) REFERENCES directors(id)
    ON DELETE CASCADE
);
