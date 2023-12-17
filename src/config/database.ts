import { Sequelize } from "sequelize";

// Provide a fallback for DATABASE_URL in case it's undefined
const databaseUrl = process.env.DATABASE_URL || '';

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : databaseUrl,
  {
    dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
    logging: false, // Optionally turn off logging for cleaner test output
    // ... other configurations
  }
);

export default sequelize;
