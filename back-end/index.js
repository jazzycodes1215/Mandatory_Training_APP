const express = require('express')
const app = express()
const port = 4000
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let secretKey = '';

//required endpoint functionalities
{/* <Route path='/' element={<Help />} />
/////////////////<Route path='/login/*' element={<Login />} />
<Route path='/account/*' element={<Account />} />
/////////////////<Route path='/registration/*' element={<Registration />} />
<Route path='/required-training/' element={<RequiredTraining />} />
<Route path='/required-training/:training/*' element={<Training />} />
<Route path='/create-training/*' element={<CreateTraining />} />
<Route path='/unit-training-manager/*' element={<UTM />} />
<Route path='/administrator/*' element={<Admin />} />
<Route path='/accounts/:user/*' element={<UserAccount />} />
/////////////////<Route path='/create-account/*' element={<CreateUserAccount />} />
<Route path='/*' element={<Help />} /> catch all */}


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


//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})
///////////////////////////////////////////////////////////////////ADMINISTRATION////////////////////////////////////////////////////////////
//endpoint for getting all user data
app.get('/users', async (req, res) => {
  try {
    const users = await knex('users')
    .select('*')
    .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving users', error 
    });
  }
});


// endpoint for adding in a new user
app.post('/users', async (req, res) => {
  const newUser = req.body; // Assuming the request body contains the necessary user data
  try {
    const insertedUser = await knex('users')
    .insert(newUser)
    .then(() => {
      res.status(200).json({message: successful});
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user', error 
    });
  }
});

//endpoint for getting a specific user
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {

    
    const user = await knex('users')
      .join('units', 'users.unit_id', 'units.id')
      .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'units.name as unit_name')
      .where('users.id', userId)
      .first()
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});


//endpoint for updating a user. Admin will most likely use this
app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body; // Assuming the request body contains the updated user data
  try {
    const userUpdate = await knex('users')
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
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userDelete = await knex('users')
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
//////////////////////////////////////////////////ADMINISTRATION//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////ACCOUNT CREATION PROCESS///////////////////////////////////////////////////////////////////////////
//endpoint that allows UTM/admin to create an account
app.post('/createAccount', async (req, res) => {
  const {first_name, last_name, rank_id, email, dodID, role_id, supervisor_id, unit_id, password} = req.body
  const hashedPass = bcrypt.hashSync(password, 10)
  try {
    const newUser = {
      // id: id,
      //first_name: first_name,
      //last_name: last_name,
      //rank_id: Number(rank_id),
      //email: email,
      password: hashedPass,
      dodID: Number(dodID),
      role_id: null,
      //supervisor_id: Number(supervisor_id),
      unit_id: null
    }
    console.log(newUser)
    const addedUser = await knex('users')
    .insert(newUser)
    .returning('*')
    .catch(e=>console.log(e))
    addedUser = addedUser.map(user => {
      delete user/*.password*/;
      return user;
    })
      res.status(200).json({message: "Account creation Success", addedUser});
  } catch  (error) {
    // console.error('Registration error:', error)
          res.status(500).json({ message: 'Error: account creation failed' });
  }
})

// Endpoint for a user to register their account with a password provided by the Admin
app.post('/registration', async (req, res) => {
  const {dodID, password} = req.body
  try {
    const user = await knex('users')
    .select('id', 'dodID', 'password')
    .where('dodID', dodID)
    .first();
    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user.password); 
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = jwt.sign({ id: user.id }, /*secretKey*/ { algorithm: 'RS256' }, function(err, token) {
          console.log('token',token);
      })
      res.status(201).json({id: user.id, token: token});
    } else {
      res.status(401).json({  message: 'Invalid username or password detected' }); 
    }
    } else {
      res.status(402).json({  message: 'User not detected' });
    }
  } catch (error) {
    //console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
  }
})

//endpoint for account to register their account that was already created
app.patch('/registration/:id', async (req, res) => {
  const userId = req.params.id
  const {first_name, last_name, rank_id, email, password, supervisor_id, unit_id} = req.body;
  const hashedPass = bcrypt.hashSync(password, 10)
  const userAccountUpdate = {
  first_name: first_name,
  last_name: last_name,
  rank_id: null,
  email: email,
  password: hashedPass,
  supervisor_id: Number(supervisor_id),
  unit_id: Number(unit_id)
  }
  
  try {
    const user = await knex('users')
    .where('id', userId)
    .update(userAccountUpdate)
    .catch(e=>console.log(e));
    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user.password); 
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = jwt.sign({ id: user.id }, /*secretKey*/ { algorithm: 'RS256' }, function(err, token) {
          console.log('token',token);
      })
      res.status(201).json({id: user.id, token: token});
    } else {
      res.status(401).json({  message: 'Invalid username or password detected' }); 
    }
    } else {
      res.status(402).json({  message: 'User not detected' });
    }
  } catch (error) {
    //console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
  }
})

///Old endpoint for if we do not have the admin assigning passwords
// app.patch('/registration/:id', async (req, res) => {
//   const userId = req.params.id
//   console.log(userId)
//   try{
//     const user = await knex('users')
//     .select('id', 'email')
//     .where('id', userId);
//     if(!user) {
//     return res.status(404).json({ message: 'User not found'})
//     }
//     const {password} = req.body
//     if(!password) {
//       return res.status(400).json({ message: 'Password is required'})
//     }
//     const hashedPass = bcrypt.hashSync(password, 10)
//     await knex('users')
//     .where('id', userId)
//     .update({password: hashedPass})
//     .then(() => {
//         res.status(200).json({message: 'Accout creation successfull' });
//       })

//     } catch (error) {
//         res.status(500).json({
//             message: 'Your request was denied'
//         })
//       }
//     });


//endpoint for account to login
app.post('/login', async (req, res) => {
  const {email, password, token} = req.body
  try {
    if(token)
    {
      const result = jwt.verify(token)
    }
    const user = await knex('users')
    .select('id', 'email', 'password', 'role_id')
    .where('email', email)
    .first();
    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user.password); 
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = jwt.sign({ id: user.id }, secretKey, { algorithm: 'RS256' }, function(err, token) {
          if(err)
          {
            console.log(err);
          }
          console.log('token',token);
      })
      res.status(201).json({id: user.id, token: token, userType: user.role_id});
    } else {
      res.status(401).json({  message: 'Invalid username or password detected' }); 
    }
    } else {
      res.status(402).json({  message: 'User not detected' });
    }
  } catch (error) {
    //console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
  }
})
//////////////////////////////////////////////////ACCOUNT CREATION PROCESS///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////TRAINING REGISTRATION///////////////////////////////////////////////////////////////////////////
//GET Request for getting all the training data
app.get('/requiredTraining', async (req, res) => {
  //
  try {
    const trainings = await knex('trainings')
      .select("*")
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }
  });

  //Endpoint for adding new trainings
  app.post('/requiredTraining', async (req, res) => {
    const newTraining = req.body;
    try {
      const insertTrainings = await knex('trainings')
        .insert(newTraining)
        .then(() => {
          res.status(200).json({message: successful});
        })
    } catch (error) {
      res.status(500).json({ message: 'Error adding training data', error });
    }
    });

      //Endpoint updating trainings list
  app.patch('/requiredTraining/:id', async (req, res) => {
    const trainingId = req.params.id;
    const updatedTraining = req.body
    try {
      const trainingUpdate = await knex('trainings')
        .where('id',trainingId)
        .update(updatedTraining)
        if (trainingUpdate) {
            res.status(200).json({ message: 'Training updated successfully' });
          } else {
            res.status(404).json({ message: 'Training not found' });
           }
    } catch (error) {
      res.status(500).json({ message: 'Error updating training data', error });
    }
    });

    //Endpoint for deleting trainings from list
    app.delete('/requiredTraining/:id', async (req, res) => {
      const trainingId = req.params.id;
      try {
        const trainingDelete = await knex('trainings')
          .where('id',trainingId)
          .del()
          if (trainingDelete) {
              res.json({ message: 'Training deleted successfully' });
            } else {
              res.status(404).json({ message: 'Training not found' });
             }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting training data', error });
      }
      });


//GET Request for assigning training to a specific duty
app.get('/requiredTraining/dutyTrainings:id', async (req, res) => {
  const dutyId = req.params.id;
  //
  try {
    // Fetch the training requirements for the given duty ID
    const trainingRequirements = await knex('duty_trainings')
      .join('trainings', 'duty_trainings.training_id', '=', 'trainings.id')
      .select("*")
      .where('duty_trainings.id', dutyId)
      .orderBy('trainings.id', 'desc')
  
    if (trainingRequirements.length === 0) {
      return res.status(404).json({ message: 'No training found for the given duty ID' });
    }
  
    res.json(trainingRequirements);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training requirements', error });
  }
  });
  

//GET specific training per duty
app.get('/requiredTraining/duties/:duty_id', async (req, res) => {
const {duty_id} = req.params;
//
try {
  // Fetch the training requirements for the given duty ID
  const trainingRequirements = await knex('duty_trainings')
  .join('trainings', 'duty_trainings.training_id', '=', 'trainings.id')
  .select("*")
  .where('duty_trainings.duty_id', duty_id)
  .orderBy('trainings.id', 'desc')
  if (trainingRequirements.length === 0) {
    return res.status(404).json({ message: 'No training requirements found for the given duty ID' });
  }
  res.json(trainingRequirements);
} catch (error) {
  res.status(500).json({ message: 'Error retrieving training requirements', error });
}
});
//////////////////////////////////////////////////TRAINING REGISTRATION///////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////UNIT ENDPOINTS///////////////////////////////////////////////////////////////////////////
//Endpoint for  fetching all units
app.get('/units', async (req, res) => {
  try {
    const users = await knex('units')
    .select('*')
    .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving units', error 
    });
  }
});

// endpoint for adding in a new unit
app.post('/units', async (req, res) => {
  const newUnit = req.body; // Assuming the request body contains the necessary user data
  try {
    const insertedUnit = await knex('units')
    .insert(newUnit)
    .then(() => {
      res.status(200).json({message: successful});
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating unit', error 
    });
  }
});

//endpoint for getting a specific unit
app.get('/units/:id', async (req, res) => {
  const unitId = req.params.id;
  try {
    const unit = await knex('units')
    .where('id', unitId)
    .first();
    if (unit) {
      res.json(unit);
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

//endpoint for updating a unit. Admin will most likely use this
app.patch('/units/:id', async (req, res) => {
  const unitId = req.params.id;
  const updatedUnit = req.body; // Assuming the request body contains the updated user data
  try {
    const unitUpdate = await knex('units')
    .where('id', unitId)
    .update(updatedUnit);
    
    if (unitUpdate) {
      res.json({ message: 'Unit updated successfully' });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating unit', error });
  }
});

//endpoint for deleting a unit
app.delete('/units/:id', async (req, res) => {
  const unitId = req.params.id;
  try {
    const unitDelete = await knex('units')
    .where('id', unitId)
    .del();
    if (unitDelete) {
      res.json({ message: 'Unit deleted successfully' });
    } else {
      res.status(404).json({ message: 'Unit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting unit', error });
  }
});
//////////////////////////////////////////////////UNIT ENDPOINTS///////////////////////////////////////////////////////////////////////////




/*
//return subordinates

app.get('/users/', async (req, res) => {
const supervisorId = req.query.supervisorId;

try {
  // Fetch all users with the specified supervisor ID
  const users = await knex('users')
    .where('supervisor_id', supervisorId)
    .select('*');

  if (users.length === 0) {
    return res.status(404).json({ message: 'No account found with the specified supervisor ID' });
  }

  res.json(users);
} catch (error) {
  res.status(500).json({ message: 'Error retrieving account', error });
}
});
*/





app.listen(port, () => {

  crypto.generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  }, (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
    if(err) console.log(err)
    secretKey = privateKey;
  });
  
  console.log(`Example app listening on port ${port}`)
})
