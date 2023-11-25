import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const demo = 'assignment 2';
  res.send(demo);
};

app.get('/', getAController);

export default app;
