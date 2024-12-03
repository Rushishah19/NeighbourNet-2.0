const express = require('express');
const { signup, login, profile, updateProfile, allWorkers,resetPassword, resetPasswordRequest } = require('../controllers/userController');

const router = express.Router();

// Existing routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', profile);
router.put('/update', updateProfile);
router.get('/workers', allWorkers);
router.post('/users/reset-password', resetPasswordRequest);
router.post('/users/reset-password/confirm', resetPassword);

router.post('/reset-password', (req, res) => {
  const { email } = req.body;
  // Logic to handle password reset
  res.json({ message: 'Password reset email sent successfully.' });
});

// New route for map
router.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/map.html')); // Serve a static HTML file for the map
});

module.exports = router;
