import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerui from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

import authRoutes from './interfaces/routes/authRoutes';
import productRoutes from './interfaces/routes/productRoutes';
import { orderRoutes } from './interfaces/routes/orderRoutes';
import aiRoutes from './interfaces/routes/aiRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', aiRoutes)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

console.log('🟢 app.ts Ok');

export { app };
