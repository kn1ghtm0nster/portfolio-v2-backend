import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { userRouter } from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).send('OK');
});

// routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
