import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { env } from '../src/config/env.js';

const tenantNames = [
  'Northstar Holdings',
  'Bluewave Capital',
  'Summit Grid',
  'Ironwood Partners',
  'Helio Operations'
];

const industries = [
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Logistics',
  'Financial Services',
  'Energy',
  'Retail',
  'Construction'
];

const nationalities = [
  'Malaysian',
  'Singaporean',
  'Indonesian',
  'Thai',
  'British',
  'American',
  'Australian',
  'Indian'
];

const firstNames = [
  'Alicia', 'Benjamin', 'Carmen', 'Daniel', 'Elena', 'Farid', 'Grace', 'Hannah', 'Imran', 'Jia',
  'Kai', 'Lina', 'Marcus', 'Nadia', 'Owen', 'Priya', 'Quinn', 'Rohan', 'Sara', 'Thomas'
];

const lastNames = [
  'Tan', 'Lim', 'Rahman', 'Ng', 'Koh', 'Patel', 'Wong', 'Lee', 'Chandra', 'Morgan',
  'Yusuf', 'Mahadi', 'Santos', 'Low', 'Teh', 'Raman', 'Shah', 'Foster', 'Bennett', 'Chan'
];

const companyPrefixes = [
  'Atlas', 'Vertex', 'Nova', 'Harbor', 'Pioneer', 'Sterling', 'Quantum', 'Crest', 'Evergreen', 'Meridian'
];

const companySuffixes = [
  'Ventures', 'Systems', 'Dynamics', 'Logistics', 'Foods', 'BioLabs', 'Energy', 'Capital', 'Industries', 'Works'
];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createFullName = () => `${randomItem(firstNames)} ${randomItem(lastNames)}`;
const createCompanyName = () => `${randomItem(companyPrefixes)} ${randomItem(companySuffixes)}`;
const createRegistrationNumber = (index) => `REG-${String(index).padStart(5, '0')}-${randomInt(10, 99)}`;
const createEmail = (fullName, index) =>
  `${fullName.toLowerCase().replace(/\s+/g, '.')}+${index}@example.com`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, '../src/db/schema.sql');

const loadSchemaSql = async () => {
  const rawSchema = await fs.readFile(schemaPath, 'utf8');

  return rawSchema
    .replace(/CREATE DATABASE IF NOT EXISTS\s+\w+;/i, `CREATE DATABASE IF NOT EXISTS ${env.db.database};`)
    .replace(/USE\s+\w+;/i, `USE ${env.db.database};`);
};

const main = async () => {
  const bootstrapConnection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: true
  });

  try {
    const schemaSql = await loadSchemaSql();
    await bootstrapConnection.query(schemaSql);
  } finally {
    await bootstrapConnection.end();
  }

  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
    multipleStatements: true
  });

  try {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE company_directors');
    await connection.query('TRUNCATE TABLE directors');
    await connection.query('TRUNCATE TABLE companies');
    await connection.query('TRUNCATE TABLE users');
    await connection.query('TRUNCATE TABLE tenants');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    const tenantIds = [];
    for (const name of tenantNames) {
      const [result] = await connection.query(
        'INSERT INTO tenants (name, status) VALUES (?, ?)',
        [name, 'active']
      );
      tenantIds.push(result.insertId);
    }

    const passwordHash = await bcrypt.hash('Password123!', 10);

    const fixedUsers = [
      { tenantId: tenantIds[0], fullName: 'Seed Admin One', email: 'seed.admin1@example.com', role: 'admin' },
      { tenantId: tenantIds[1], fullName: 'Seed Admin Two', email: 'seed.admin2@example.com', role: 'admin' },
      { tenantId: tenantIds[2], fullName: 'Seed Admin Three', email: 'seed.admin3@example.com', role: 'admin' },
      { tenantId: tenantIds[3], fullName: 'Seed Admin Four', email: 'seed.admin4@example.com', role: 'admin' },
      { tenantId: tenantIds[4], fullName: 'Seed Admin Five', email: 'seed.admin5@example.com', role: 'admin' }
    ];

    for (const user of fixedUsers) {
      await connection.query(
        `INSERT INTO users (tenant_id, full_name, email, password_hash, role)
         VALUES (?, ?, ?, ?, ?)`,
        [user.tenantId, user.fullName, user.email, passwordHash, user.role]
      );
    }

    for (let index = fixedUsers.length; index < 20; index += 1) {
      const fullName = createFullName();
      await connection.query(
        `INSERT INTO users (tenant_id, full_name, email, password_hash, role)
         VALUES (?, ?, ?, ?, ?)`,
        [
          tenantIds[index % tenantIds.length],
          fullName,
          createEmail(fullName, index + 1),
          passwordHash,
          index % 2 === 0 ? 'manager' : 'viewer'
        ]
      );
    }

    const directorIds = [];
    for (let index = 0; index < 800; index += 1) {
      const [result] = await connection.query(
        'INSERT INTO directors (full_name, nationality, birth_year) VALUES (?, ?, ?)',
        [createFullName(), randomItem(nationalities), randomInt(1950, 1995)]
      );
      directorIds.push(result.insertId);
    }

    const companyIds = [];
    for (let index = 0; index < 500; index += 1) {
      const [result] = await connection.query(
        `INSERT INTO companies (tenant_id, name, registration_number, industry, revenue, employee_count)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          tenantIds[index % tenantIds.length],
          `${createCompanyName()} ${index + 1}`,
          createRegistrationNumber(index + 1),
          randomItem(industries),
          randomInt(250000, 90000000),
          randomInt(10, 5000)
        ]
      );
      companyIds.push(result.insertId);
    }

    const usedPairs = new Set();
    for (const companyId of companyIds) {
      const relationshipCount = randomInt(0, 6);
      for (let index = 0; index < relationshipCount; index += 1) {
        const directorId = randomItem(directorIds);
        const key = `${companyId}:${directorId}`;
        if (usedPairs.has(key)) {
          continue;
        }
        usedPairs.add(key);
        await connection.query(
          'INSERT INTO company_directors (company_id, director_id) VALUES (?, ?)',
          [companyId, directorId]
        );
      }
    }

    console.log('Seed completed');
    console.log(`Database bootstrapped: ${env.db.database}`);
    console.log('Sample login: seed.admin1@example.com / Password123!');
  } finally {
    await connection.end();
  }
};

main().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
