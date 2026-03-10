import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { configureSwagger } from './docs/openapi.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

app.use(
  cors({
    origin: env.frontendUrl
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

configureSwagger(app);
app.use('/api', routes);
app.use(errorMiddleware);

export default app;
