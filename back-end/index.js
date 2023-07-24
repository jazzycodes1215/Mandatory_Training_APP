const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*
app.get('/users', async (req, res) => {
  try {
    const users = await knex('user').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

app.post('/users', async (req, res) => {
  const newUser = req.body; // Assuming the request body contains the necessary user data
  try {
    const insertedUser = await knex('user').insert(newUser);
    res.json({ id: insertedUser[0], ...newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await knex('user').where('id', userId).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body; // Assuming the request body contains the updated user data
  try {
    const numUpdated = await knex('user').where('id', userId).update(updatedUser);
    if (numUpdated) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const numDeleted = await knex('user').where('id', userId).del();
    if (numDeleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});
*/