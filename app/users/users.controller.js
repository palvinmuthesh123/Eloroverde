const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/login', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/all/:id', getAllWithId);
router.get('/current', getCurrent);
router.get('/getlanguage/:id', getLanguage);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.get('/activate/:id', activate);
router.get('/request/:id/:fid/:type', sendRequest);
router.get('/requests/:id', getRequests);
router.delete('/request/:id', deleteRequest);
router.get('/request/:id', acceptRequest);
// router.post('/address', addAddress);
router.post('/message' ,sendMessage);
router.get('/message/:id/:rec_id' ,getMessages);
router.post('/updatemessage' ,updateMessage);
router.post('/update/password', forgotPassword)
router.post('/language', language)
router.get('/useraddress/:id', getAllAddress);
router.get('/address/:id/:uid', getAddressById);
router.delete('/address/:id/:uid', deleteAddress);
router.post('/address' ,createAddress);
router.post('/updateaddress' ,updateAddress);
router.post('/changepassword', changePassword);
router.post('/editprofile', editProfile);

module.exports = router;

function getMessages(req, res, next) {
    userService.getMessages(req.params.id, req.params.rec_id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function updateMessage(req, res, next) {
    userService.updateMessage(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function language(req, res, next) {
    userService.language(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function sendMessage(req, res, next) {
    userService.sendMessage(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function changePassword(req, res, next) {
    userService.changePassword(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email is incorrect' }))
        .catch(err => next(err));
}

function editProfile(req, res, next) {
    userService.editProfile(req.body)
        .then((user) => user ? res.json(user): res.status(400).json({ message: 'User ID is incorrect' }))
        .catch(err => next(err));
}

function acceptRequest(req, res, next){
    userService.acceptRequest(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// function addAddress(req, res, next){
//     userService.addAddress(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

function deleteRequest(req, res, next) {
    userService.deleteRequest(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getRequests(req, res, next) {
    userService.getRequests(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getLanguage(req, res, next) {
    userService.getLanguage(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function sendRequest(req, res, next) {
    userService.sendRequest(req.params.id, req.params.fid, req.params.type)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log(req.body)
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function forgotPassword(req, res, next) {
    userService.forgotPassword(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllWithId(req, res, next) {
    userService.getAllWithId(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function activate(req, res, next) {
    userService.activate(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createAddress(req, res, next) {
    userService.createAddress(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}

function getAllAddress(req, res, next) {
    userService.getAllAddress(req.params.id)
        .then(products => res.json(products))
        .catch(err => next(err));
}

function getAddressById(req, res, next) {
    userService.getAddressById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteAddress(req, res, next) {
    userService.deleteAddress(req.params.id, req.params.uid)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateAddress(req, res, next) {
    userService.updateAddress(req.body)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(err => next(err));
}