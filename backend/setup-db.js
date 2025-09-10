const { Client } = require('pg');
require('dotenv').config();

// Cấu hình kết nối
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'login',
  user: 'postgres',
  password: 'postgres'
});

async function testConnection() {
  try {
    // Thử kết nối
    await client.connect();
    console.log('Kết nối thành công đến PostgreSQL!');
    
    // Tạo bảng users
    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Add indexes
      CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
    `);
    console.log('Bảng users đã được tạo!');

    // Thêm user mẫu
    await client.query(`
      INSERT INTO users (name, email, password) 
      VALUES ('Test User', 'test@example.com', '$2b$10$9OXCJHrRgMRwdnGl/vB.b.UlppQ2wpA6mVrD0IqK1nFBDDdPZo03y')
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('User mẫu đã được tạo!');

    // Đóng kết nối
    await client.end();
    console.log('Thiết lập database hoàn tất!');
  } catch (error) {
    console.error('Lỗi kết nối đến PostgreSQL:', error);
  }
}

testConnection();
