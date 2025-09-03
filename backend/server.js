import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// In-memory user store
const users = [];

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users.push({ username, password });
  res.json({ message: 'Registration successful.' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.json({ message: 'Login successful.' });
});

app.listen(port, () => {
  console.log(`Auth backend running on port ${port}`);
});
