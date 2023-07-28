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
      .join('ranks', 'users.rank_id', 'ranks.id')
      .join('units', 'users.unit_id', 'units.id')
      .select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.supervisor_id', 'units.name as unit_name', 'ranks.name as rank_name', 'ranks.id as rank_id')
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

//endpoint for getting all duties
app.get('/duties', async (req, res) => {
  try {
    const users = await knex('duties')
    .select('*')
    .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving duties', error
    });
  }
});

//endpoint for getting all duties for a specific user
app.get('/duties/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const duties = await knex('user_duties')
      .join('duties', 'user_duties.duty_id', 'duties.id')
      .where('user_duties.user_id', userId)
    if (duties) {
      res.json(duties);
    } else {
      res.status(404).json({ message: 'No duties found for user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving duties', error });
  }
});

//endpoint for updating a user. Admin will most likely use this
app.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body; // Assuming the request body contains the updated user data
  console.log(req.body);
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
    .del()
    .catch(e=>console.log(e))
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
  const {/*first_name, last_name, rank_id, email, */dodID, role_id,/* supervisor_id, */unit_id, password} = req.body
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
      role_id: role_id,
      //supervisor_id: Number(supervisor_id),
      unit_id: unit_id
    }
    console.log(newUser)
    let addedUser = await knex('users')
    .insert(newUser)
    .returning('*');

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
        const token = jwt.sign({ id: user.id }, secretKey, { algorithm: 'RS256' }, function(err, token) {
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
    console.error('login error detected:', error);
          res.status(500).json({ message: 'login error detected' });
  }
})

//endpoint for account to register their account that was already created
app.patch('/registration/:id', async (req, res) => {
  const userId = req.params.id
  const {first_name, last_name, rank_id, email, password, supervisor_id} = req.body;
  const hashedPass = bcrypt.hashSync(password, 10)
  const userAccountUpdate = {
      first_name: first_name,
      last_name: last_name,
      rank_id: rank_id,
      email: email,
      role_id: 2
  }

  try {
    const user = await knex('users')
    .where('id', userId)
    .update(userAccountUpdate)
    .returning('*')
    .catch(e=>console.log(e));

    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user[0].password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = await jwt.sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60), userType: user.role_id, unit: user.unit_id}, secretKey, { algorithm: 'RS256' }, function(err, token) {

          if(err)
          {
            console.log(err);
            res.status(500).json({message: 'Unknown Error'});
            return;
          }
          else
          {

            res.status(201).json({id: user.id, token: token, userType: user.role_id, unit: user.unit_id});
            return;
          }
      })
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
      const result =  jwt.verify(token, secretKey, (err, decoded) => {
        if(err)
        {
          console.log(err);
          return;
        }
        else
        {
          if(decoded.exp < Date.now())
          {
            res.status(201).json({id: decoded.id, exp: decoded.exp, userType: decoded.userType, token: token, user: decoded.user_id, unit: decoded.unit})
          }
        }
      })
      return;
    }
    const user = await knex('users')
    .select('id', 'email', 'password', 'role_id', "unit_id")
    .where('email', email)
    .first();
    if(user) {
      const passwordCheck = bcrypt.compareSync(password, user.password);
      console.log(passwordCheck);
      if (passwordCheck) {
        const token = await jwt.sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60), userType: user.role_id, unit: user.unit_id}, secretKey, { algorithm: 'RS256' }, function(err, token) {
          if(err)
          {
            console.log(err);
            res.status(500).json({message: 'Unknown Error'});
          }
          else
          {
            console.log(user);
            res.status(201).json({id: user.id, token: token, userType: user.role_id, unit: user.unit_id});
            return;
          }
      })

    } else {
      res.status(401).json({  message: 'Invalid username or password detected' });
    }
    } else {
      res.status(402).json({  message: 'User not detected' });
    }
  } catch (error) {
    //console.error('login error detected:', error);
    console.log(error);
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
      .join('type', 'trainings.type_id', 'type.id')
      .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }
  });

app.get('/requiredTraining/primaryTraining', async (req, res) => {

  try {
    const trainings = await knex('trainings')
      .join('type', 'trainings.type_id', 'type.id')
      .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
      .where('type.name', 'Primary Training')
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }
  });

app.get('/requiredTraining/auxTraining', async (req, res) => {

  try {
    const trainings = await knex('trainings')
      .join('type', 'trainings.type_id', 'type.id')
      .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
      .where('type.name', 'Auxiliary Training')
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }
  });

app.get('/requiredTraining/PME', async (req, res) => {

  try {
    const trainings = await knex('trainings')
      .join('type', 'trainings.type_id', 'type.id')
      .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
      .where('type.name', 'rofessional Military Education')
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }

  });
app.get('/requiredTraining/ADT', async (req, res) => {

  try {
    const trainings = await knex('trainings')
      .join('type', 'trainings.type_id', 'type.id')
      .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
      .where('type.name', 'Additional Duty Training')
      .then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training data', error });
  }
  });

  app.get('/training/:id', async (req, res) => {
    const trainingId = req.params.id;
    try {
      const training = await knex('trainings')
        .join('type', 'trainings.type_id', 'type.id')
        .select('trainings.id', 'trainings.name', 'trainings.interval', 'trainings.source', 'type.name as type_name', 'type.id as type_id')
        .where('trainings.id', trainingId)
        .first()
      if (training) {
        res.json(training);
      } else {
        res.status(404).json({ message: 'Training not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving training', error });
    }
  });


app.get('/requiredTraining/:id', async (req, res) => {
  const {id} = req.params;
  try {
    //I tried not to use knex.raw I swear.
    const trainings = await knex.raw(`SELECT trainings.id, name, interval FROM trainings
    JOIN duty_trainings ON trainings.id = duty_trainings.training_id JOIN user_duties ON duty_trainings.duty_id = user_duties.id
    WHERE user_duties.user_id = ?`, [id])
    if(trainings?.rows)
    {
      res.status(201).json(trainings?.rows)
    }
    else
    {
      res.status(404);
    }

  } catch (error) {
    console.log(error)
  }
})

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

//////////////////////////////////////////////////NOTIFICATION ENDPOINTS///////////////////////////////////////////////////////////////////////////

//This endpoint is for getting all notifications and will be the primary endpoint
// app.get('/notifications', async (req, res) => {
//   try {
//     const notifications = await knex('training_status')
//       .select(
//         'id',
//         'comment',
//         'read_status',
//         'submission_date',
//         'completetion_date',
//         'approval_date'
//       )
//       .orderBy('submission_date', 'desc');
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching notifications', error });
//   }
// });

// This endpoint is for faking notifications for testing reasons
app.get('/notifications', async (req, res) => {
  try {
    const notifications = await knex('training_status')
      .select(
        'training_status.id',
        'training_status.comment',
        'training_status.training_id',
        'training_status.read_status',
        'training_status.submission_date',
        'training_status.completetion_date',
        'training_status.approval_date',
        'trainings.name as training_name'
      )
      .leftJoin('trainings', 'training_status.training_id', 'trainings.id')
      .orderBy('submission_date', 'desc');

    // Generate a random notification
    const randomNotification = {
      id: -1,
      comment: 'This is a random notification!',
      training_id: null,
      read_status: false,
      submission_date: new Date().toISOString(),
      completetion_date: null,
      approval_date: null,
      training_name: null
    };
    const allNotifications = [...notifications, randomNotification];
    res.json(allNotifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

//Endpoint for Fetching Notifications for a Specific User:
app.get('/notifications/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const notifications = await knex('training_status')
    .select('id', 'comment', 'read_status', 'submission_date', 'completetion_date', 'approval_date')
    .where({ user_id: userId })
    .orderBy('submission_date', 'desc');
    res.json({notifications});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

//Endpoint for marking Notifications as read
app.patch('/notifications/:id', async (req, res) => {
  try {
    const notificationsId = req.params.id;
    await knex('training_status')
    .where({ id: notificationsId })
    .update({ read_status: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification', error });
  }
});

app.delete('/notifications/:id', async (req, res) => {
  try {
    const notificationsId = req.params.id;
    await knex('training_status')
    .where({ id: notificationsId })
    .del()
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification', error });
  }
});

//Endpoint for sending push-notifications to users (might require a 3rd party api)
// app.post('/notifications/:user_id', async (req, res) => {
//   try {
//     const { id, user_id, title, body } = req.body;
//     const userId = req.params.user_id;
//     const notifications = await knex('training_status')
//     .select('id', 'comment', 'read_status', 'submission_date', 'completion_date', 'approval_date')
//     .where({ user_id: userId })
//     .orderBy('submission_date', 'desc');
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching notifications', error });
//   }
// });

//////////////////////////////////////////////////NOTIFICATION ENDPOINTS///////////////////////////////////////////////////////////////////////////

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

  console.log(`listening on port ${port}`)
})

//Endpoint for getting an individuals training Status
app.get('/user/status/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const trainings = await knex('users')
      .select(
        'users.rank_id',
        'users.last_name',
        'users.first_name',
        'users.supervisor_id',
        'trainings.name as training_name',
        'trainings.interval',
        'trainings.source',
        'training_status.completetion_date',
        'training_status.submission_date'
      )
      .where('users.id', userId)
      .join('user_duties', 'users.id', 'user_duties.user_id')
      .join('duty_trainings', 'user_duties.duty_id', 'duty_trainings.duty_id')
      .join('trainings', 'duty_trainings.training_id', 'trainings.id')
      .leftJoin('training_status', (join) => {
        join
          .on('users.id', 'training_status.user_id')
          .andOn('trainings.id', 'training_status.training_id');
      });

    const userTrainings = trainings.reduce((acc, training) => {
      const trainingName = training.training_name;
      if (!acc[trainingName]) {
        acc[trainingName] = { ...training, completetion_date: null };
      }
      if (
        training.completetion_date &&
        (!acc[trainingName].completetion_date || training.completetion_date > acc[trainingName].completetion_date)
      ) {
        acc[trainingName].completetion_date = training.completetion_date;
      }
      return acc;
    }, {});

    const result = Object.values(userTrainings);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user status', error });
  }
});


// app.get('/unit/status/:unitId', async (req, res) => {
//   const unitId = req.params.unitId;

//   try {
//     const users = await knex('users')
//       .select(
//         'users.id',
//         'users.rank_id',
//         'users.last_name',
//         'users.first_name',
//         'users.supervisor_id',
//         'training_status.comment',
//         'training_status.read_status',
//         'training_status.submission_date',
//         'training_status.completetion_date',
//         'training_status.approval_date',
//         'trainings.name as training_name',
//         'trainings.interval',
//         'trainings.source',
//         'training_status.*'
//       )
//       .where('users.unit_id', unitId)
//       .join('user_duties', 'users.id', 'user_duties.user_id')
//       .join('duty_trainings', 'user_duties.duty_id', 'duty_trainings.duty_id')
//       .join('trainings', 'duty_trainings.training_id', 'trainings.id')
//       .leftJoin('training_status', (join) => {
//         join
//           .on('users.id', 'training_status.user_id')
//           .andOn('trainings.id', 'training_status.training_id');
//       });
//     // Group the users by user_id and calculate the most recent completion date for each training
//     const groupedUsers = users.reduce((acc, user) => {
//       const userId = user.id;
//       if (!acc[userId]) {
//         acc[userId] = { ...user, completetion_date: null };
//       }
//       if (
//         user.completetion_date &&
//         (!acc[userId].completetion_date || user.completetion_date > acc[userId].completetion_date)
//       ) {
//         acc[userId].completetion_date = user.completetion_date;
//       }
//       return acc;
//     }, {});

//     const result = Object.values(groupedUsers);

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving users', error });
//   }
// });

app.get('/unit/status/:unitId', async (req, res) => {
  const unitId = req.params.unitId;

  try {
    const users = await knex('users')
      .select(
        'users.rank_id',
        'users.last_name',
        'users.first_name',
        'users.supervisor_id',
        'trainings.name as training_name',
        'trainings.interval',
        'trainings.source',
        'training_status.completetion_date',
        'training_status.submission_date'
      )
      .where('users.unit_id', unitId)
      .join('user_duties', 'users.id', 'user_duties.user_id')
      .join('duty_trainings', 'user_duties.duty_id', 'duty_trainings.duty_id')
      .join('trainings', 'duty_trainings.training_id', 'trainings.id')
      .leftJoin('training_status', (join) => {
        join
          .on('users.id', 'training_status.user_id')
          .andOn('trainings.id', 'training_status.training_id');
      });

    // Group the training data by user information
    const groupedData = users.reduce((acc, user) => {
      const { rank_id, last_name, first_name, supervisor_id } = user;
      const userData = acc[`${rank_id}_${last_name}_${first_name}_${supervisor_id}`];
      if (userData) {
        userData.push(user);
      } else {
        acc[`${rank_id}_${last_name}_${first_name}_${supervisor_id}`] = [user];
      }
      return acc;
    }, {});

    const result = Object.values(groupedData);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});
