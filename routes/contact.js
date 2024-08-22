const express = require('express');
const router = express.Router();
const ContactController = require('../controller/ContactController')
const auth = require('../helpers/auth').validateToken
const contactValidation = require('../validations/contact')
const validator = require('express-joi-validation').createValidator({});

router.post('/add/contact', auth, validator.body(contactValidation.addContact), function(req, res) {
    ContactController.addContact(req, res)
})

router.post('/update/contact/:id', auth, validator.body(contactValidation.addContact), function(req, res) {
    ContactController.updateContact(req, res)
})

router.get('/list/contacts', auth, function(req, res) {
    ContactController.getContacts(req, res)
})

router.get('/get/contact/:id', auth, function(req, res) {
    ContactController.getContact(req, res)
})

router.delete('/delete/contact/:id', auth, function(req, res) {
    ContactController.deleteContact(req, res)
})

module.exports = router;