const express = require('express')
const app = express()
const port = 4000
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//endpoint for getting all user data
app.get('/user', async (req, res) => {
  try {
    const users = await knex('user')
    .select('*')
    .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving users', error 
    });
  }
});

/* Data is printed in this format 
 [
    {
        "id": 1,
        "first_name": "user",
        "last_name": "greatest",
        "rank_id": 1,
        "email": "email",
        "password": "$2b$10$7rqr7/R8ItOmWDVQh97tMuKM9jOMTH3QRepdtDRYoEvsljLngEMle",
        "dodID": 1609444483,
        "role_id": 1,
        "supervisor_id": 1,
        "unit_id": 1
    }
]
*/
// endpoint for adding in a new user
app.post('/user', async (req, res) => {
  const newUser = req.body; // Assuming the request body contains the necessary user data
  try {
    const insertedUser = await knex('user')
    .insert(newUser)
    .then(() => {
      res.json({ id: insertedUser[0], ...newUser });
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user', error 
    });
  }
});

//endpoint for getting a specific user
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await knex('user')
    .where('id', userId)
    .first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

//endpoint for updating a user
app.patch('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body; // Assuming the request body contains the updated user data
  try {
    const userUpdate = await knex('user')
    .where('id', userId)
    .update(updatedUser);
    
    if (userUpdate) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

//endpoint for deleting a user
app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userDelete = await knex('user')
    .where('id', userId)
    .del();
    if (userDelete) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

//endpoint for creating an account
app.post('./create-account', async (req, res) => {
  const {id,first_name, last_name, rank_id, email, password, dodID, role_id, supervisor_id, unit_id} = req.body
  const hashedPass = await bcrypt.hashSync(password, 10)
  try {
    const newUser = {
      id: id,
      first_name: first_name,
      last_name: last_name,
      rank_id: rank_id,
      email: email,
      password: hashedPass,
      dodID: dodID,
      role_id:role_id,
      supervisor_id, supervisor_id,
      unit_id: unit_id
    }
    console.log(newUser)
    const addedUser = await knex('user')
    .insert(newUser)
    .returning('*')
    addedUser = addedUser.map(user => {
      delete user.password;
      return user;
    })
      res.status(200).json({message: "Account creation Success", addedUser});
  } catch  (error) {
          res.status(500).json({ message: 'Error: account creation failed' });
  }
})

//endpoint for user login
app.post('./login', async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await knex('user')
    .select('id', 'email', 'password')
    .where('email', email)
    .first();
    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user.password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = jwt.sign({ id: user.id }, { algorithm: 'RS256' }, function(err, token) {
          console.log('token',token);
      })
      res.status(201).json({id: user.id, token: token});
    } else {
      res.status(401).json({  message: 'Invalid username or password detected' }); 
    }
    } else {
      res.status(402).json({  message: 'User not detected' });
    }
  } catch  (error) {
    console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
  }
})


//return require training
app.get('/required-training/:user-id', async (req, res) => {
const dutyId = req.query.dutyId;

try {
  // Fetch the training requirements for the given duty ID
  const trainingRequirements = await knex('duty_training')
    .where('duty_id', dutyId)
    .join('training', 'duty_training.training_id', '=', 'training.id')
    .select('training.name', 'training.interval', 'training.source');

  if (trainingRequirements.length === 0) {
    return res.status(404).json({ message: 'No training requirements found for the given duty ID' });
  }

  res.json(trainingRequirements);
} catch (error) {
  res.status(500).json({ message: 'Error retrieving training requirements', error });
}
});

/*
//return subordinates

app.get('/users/', async (req, res) => {
const supervisorId = req.query.supervisorId;

try {
  // Fetch all users with the specified supervisor ID
  const users = await knex('user')
    .where('supervisor_id', supervisorId)
    .select('*');

  if (users.length === 0) {
    return res.status(404).json({ message: 'No users found with the specified supervisor ID' });
  }

  res.json(users);
} catch (error) {
  res.status(500).json({ message: 'Error retrieving users', error });
}
});
*/