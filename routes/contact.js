const express = require('express');
const router = express.Router();
const ContactController = require('../controller/ContactController')

router.post('/add/contact', function(req, res) {
    ContactController.addContact(req, res)
})

router.post('/update/contact/:id', function(req, res) {
    ContactController.updateContact(req, res)
})

router.get('/list/contacts', function(req, res) {
    ContactController.getContacts(req, res)
})

router.get('/get/contact/:id', function(req, res) {
    ContactController.getContact(req, res)
})

router.delete('/delete/contact/:id', function(req, res) {
    ContactController.deleteContact(req, res)
})

module.exports = router;