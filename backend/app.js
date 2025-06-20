const express = require('express');
const errorHandlingMiddleware = require('./middleware/error-handling-middleware');
const userRouter = require('./routes/users-router');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트가 열렸습니다!`);
})