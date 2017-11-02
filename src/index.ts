import * as functions from 'firebase-functions'
import * as express from 'express'
import { User } from "./Models/User";
import { addUser, getUser, deleteUser } from "./Apis/usersApi";
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    res.status(403).send('Unauthorized');
  });
};

app.use(cors);
//app.use(authenticate);

// Users API REST //
app.post('/users', addUser);

app.get('/users/:userId', getUser);

app.delete('/users/:userId', deleteUser);


///////////////////////////////////////////////////////////////

exports.api = functions.https.onRequest(app);
