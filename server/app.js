const express = require('express');
//Создаем приложуху на базе express
const app = express();
const { userValidator, loginValidator } = require('./services/validators');
const UserController = require('./controllers/users-controller');

app.use(express.json());

app.post('/api/signup', userValidator, UserController.create);
app.post('/api/login', loginValidator, UserController.login);

app.get('/hello', (req, res, next) => {
  res.send('Hello');
});

app.listen(4000, () => {
  console.log('Server started on 4000 pert');
});
