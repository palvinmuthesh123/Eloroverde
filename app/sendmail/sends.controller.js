const express = require('express');
const router = express.Router();
const sends = require('./sends.service');

// routes
router.post('/', Sendings);
router.get('/sendings', getAllSendings);
router.post('/sending', getSendingById);
router.delete('/sending/:id', deleteSending);
router.post('/sending', updateSending);

module.exports = router;

function Sendings(req, res, next) {
    sends.Sendings(req.body)
    .then(sends => sends ? res.json(sends) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllSendings(req, res, next) {
    sends.getAllSendings()
        .then(sends => res.json(sends))
        .catch(err => next(err));
}

function getSendingById(req, res, next) {
    sends.getSendingById(req.body)
        .then(sends => sends ? res.json(sends) : res.sendStatus(404))
        .catch(err => next(err));
}

function deleteSending(req, res, next) {
    sends.deleteSending(req.params.id)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function updateSending(req, res, next) {
    sends.updateSending(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}