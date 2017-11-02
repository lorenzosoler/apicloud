"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const usersApi_1 = require("./Apis/usersApi");
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
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
app.post('/users', usersApi_1.addUser);
app.get('/users/:userId', usersApi_1.getUser);
app.delete('/users/:userId', usersApi_1.deleteUser);
//////////////////////////////////////////////////////////////
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map