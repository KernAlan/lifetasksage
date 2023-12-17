import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes';

export function createApp(): Express {
    const app = express();
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    });

    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(limiter);
    app.use(morgan('dev'));

    app.use('/api/todos', todoRoutes);

    app.use((err: any, req: any, res: any, next: any) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    return app;
}
