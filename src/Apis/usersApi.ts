import * as firebase from 'firebase-admin'
import * as functions from 'firebase-functions'
firebase.initializeApp(functions.config().firebase);

const usersRef = firebase.database().ref('/users');

export function addUser (req, res) {
    const user = req.body // El objeto que mandemos.
    let userId = usersRef.push().key;
    user['uid'] = userId;
    console.log(user);
    usersRef.child(userId).set(user).then(() => {
        res.json(user);
    }).catch(err => {
        console.log('Error getting add user', userId, err.message);
        res.sendStatus(500);
    });
}

export function getUser (req, res) {
    const userId = req.params.userId;
    usersRef.child(userId).once("value").then((snap) => {
        if (snap.val() !== null) {
        res.status(200).json(snap.val());
        } else {
        res.status(404).json({errorCode: 404, errorMessage: `message '${userId}' not found`});
        }
    }).catch(error => {
        console.log('Error getting user details', userId, error.message);
        res.sendStatus(500);
    });
}

export function deleteUser (req, res) {
    const userId = req.params.userId;
    usersRef.child(userId).set(null).then(() => {
        res.status(200).json(userId);
    }).catch(error => {
        console.log('Error delete user details', userId, error.message);
        res.sendStatus(500);
    });
}