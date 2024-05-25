const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const dataFile = './data.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const readData = () => {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
};
const writeData = (users) => {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
};

// let users = [
//   {
//     id: 1,
//     name: 'Nguyen Van A',
//   },
//   {
//     id: 2,
//     name: 'Nguyen Van B',
//   },
//   {
//     id: 3,
//     name: 'Nguyen Van C',
//   },];
const users = readData();
app.get('/users', (req, res) => {
  console.log('GET All Users');

  console.log(users);
  res.json(users);
});

// app.get('/users/ngu', (req, res) => {
//   res.json('Vao day la ngusss');
// });

app.get('/users/:id', (req, res) => {
  console.log('GET User by ID');
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id, 10));
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log('POST User: ', newUser);

  users.push(newUser);
  writeData(users);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updateUser = req.body;
  console.log(`PUT users with id ${userId}: `, updateUser);

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = updateUser;
    res.json(updateUser);
    writeData(users);
  } else {
    res.status(404).json({
      message: `User with id ${userId} not found`,
    });
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(`DELETE user with id ${userId}`);
  let users = readData();
  users = users.filter((user) => user.id !== userId);
  writeData(users);
  res.json(users);   
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
