import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './db.ts';
import User from './models/User.ts';

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    //new user
    const newUser = new User(req.body);

    //save user
    const savedUser = await newUser.save();

    //response
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    //error
    const errorMessage =
      error instanceof Error ? error.message : 'server error';
    res.status(500).json({
      message: 'Error saving user to database',
      error: errorMessage,
    });
  }
});

//start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server  at http://localhost:${PORT}`);
  console.log(`API at http://localhost:${PORT}/api/users`);
});
