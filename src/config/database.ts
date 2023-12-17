// config/database.ts
import { Sequelize } from "sequelize";
import { databaseConfig, Environment } from './databaseConfig';

const env = process.env.NODE_ENV as Environment || 'development';
const { url, dialect, logging } = databaseConfig[env];

const sequelize = new Sequelize(url, { dialect, logging });

export default sequelize;
