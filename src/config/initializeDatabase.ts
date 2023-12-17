// initializeDatabase.ts

import sequelize from './database';

export const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Failed to sync database:', error);
    throw error;  // Rethrow the error to handle it in the calling function
  }
};
