const express = require('express');
const { signup,login,profile,updateProfile ,allWorkers} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', profile);
router.put('/update', updateProfile);
router.get('/workers', allWorkers);

module.exports = router;
