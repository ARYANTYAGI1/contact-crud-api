const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')

router.post('/register', function(req, res) {
    UserController.register(req, res)
})

router.post('/login', function(req, res) {
    UserController.login(req, res)
})

// router.get('/list/contacts', function(req, res) {
//     ContactController.getContacts(req, res)
// })

module.exports = router;