import express, { Express } from 'express';

export function createApp(): Express {
    const app = express();
    app.use(express.json());
    // Other middleware can be added here
    return app;
}