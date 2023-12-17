// config/databaseConfig.ts

type Environment = 'development' | 'test' | 'production';

interface DatabaseConfig {
    url: string;
    dialect: 'sqlite' | 'postgres';
    logging: boolean;
}

const developmentConfig: DatabaseConfig = {
    url: process.env.DEVELOPMENT_DATABASE_URL || 'postgres://user:password@localhost:5432/mydb',
    dialect: 'postgres',
    logging: true,
};

const testConfig: DatabaseConfig = {
    url: 'sqlite::memory:',
    dialect: 'sqlite',
    logging: false,
};

const productionConfig: DatabaseConfig = {
    url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb',
    dialect: 'postgres',
    logging: false,
};

const databaseConfig = {
    development: developmentConfig,
    test: testConfig,
    production: productionConfig
};

export { databaseConfig, DatabaseConfig, Environment };
