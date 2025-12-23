// backend_kvackalnica/initTables.js
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = process.env.DATABASE_URL || process.env.DB_URL;

if (!dbUrl) {
  throw new Error("Missing DATABASE_URL (or DB_URL). Set it in Render Environment Variables.");
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function init() {
  // 1) Extensions (UUID)
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  // 2) USERS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3) PROJECTS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) DEFAULT 'in_progress',
      difficulty_rating INT NOT NULL DEFAULT 3 CHECK (difficulty_rating BETWEEN 1 AND 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      finished_at TIMESTAMP NULL
    );
  `);

  // 4) IMAGES
  await pool.query(`
    CREATE TABLE IF NOT EXISTS images (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
      filename VARCHAR(255) NOT NULL,
      file_path VARCHAR(1024) NOT NULL,
      file_size BIGINT,
      mime_type VARCHAR(100),
      upload_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5) Indexi (priporočeno; pospeši pogoste poizvedbe)
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_images_project_id ON images(project_id);`);

  console.log("✅ DB init OK: tables ensured (users, projects, images) + indexes.");
}

(async () => {
  try {
    await init();
  } catch (err) {
    console.error("❌ DB init failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
