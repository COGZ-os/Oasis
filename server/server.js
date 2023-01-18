const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
const authRouter = require('./routes/authRouter');
const locationsRouter = require('./routes/locationsRouter');
const favoritesRouter = require('./routes/favoritesRouter');

app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/locations', locationsRouter);
app.use('/favorites', favoritesRouter);

app.use('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// Handle all remaining endpoints that are not defined in the server/routers
app.use('*', (req, res) => {
  return res.status(404).json('Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",  
    status: 500,
    message: {err: "Global error handler invoked"},
  }
  const error = Object.assign({}, defaultErr, err);
  console.log(`${error.log}: ${error.message.err}`);
  return res.status(error.status).json(error.message);
})

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});