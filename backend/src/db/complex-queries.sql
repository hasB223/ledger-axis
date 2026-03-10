-- 1. INNER JOIN: return company with all directors
SELECT c.id, c.name, d.full_name, d.nationality
FROM companies c
INNER JOIN company_directors cd ON cd.company_id = c.id
INNER JOIN directors d ON d.id = cd.director_id
WHERE c.tenant_id = ? AND c.id = ?;

-- 2. LEFT JOIN: return companies including those without directors
SELECT c.id, c.name, COUNT(cd.director_id) AS director_count
FROM companies c
LEFT JOIN company_directors cd ON cd.company_id = c.id
WHERE c.tenant_id = ?
GROUP BY c.id, c.name;

-- 3. Aggregation query: number of companies per industry
SELECT industry, COUNT(*) AS company_count
FROM companies
WHERE tenant_id = ?
GROUP BY industry;

-- 4. Multi-table join: company + directors + tenant name
SELECT c.name AS company_name, t.name AS tenant_name, d.full_name AS director_name
FROM companies c
INNER JOIN tenants t ON t.id = c.tenant_id
LEFT JOIN company_directors cd ON cd.company_id = c.id
LEFT JOIN directors d ON d.id = cd.director_id
WHERE c.tenant_id = ? AND c.id = ?;

-- 5. Search with LIKE and pagination
SELECT id, name, registration_number
FROM companies
WHERE tenant_id = ? AND name LIKE CONCAT('%', ?, '%')
ORDER BY name ASC
LIMIT ? OFFSET ?;

-- 6. Top companies ordered by revenue
SELECT id, name, revenue
FROM companies
WHERE tenant_id = ?
ORDER BY revenue DESC
LIMIT 10;

-- 7. Director count per company using GROUP BY
SELECT c.id, c.name, COUNT(cd.director_id) AS director_count
FROM companies c
LEFT JOIN company_directors cd ON cd.company_id = c.id
WHERE c.tenant_id = ?
GROUP BY c.id, c.name;

-- 8. HAVING clause
SELECT c.id, c.name, COUNT(cd.director_id) AS director_count
FROM companies c
LEFT JOIN company_directors cd ON cd.company_id = c.id
WHERE c.tenant_id = ?
GROUP BY c.id, c.name
HAVING COUNT(cd.director_id) >= ?;
