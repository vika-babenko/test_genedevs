const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// A protected route that requires authentication
router.get('/protected', auth, (req, res) => {
  res.send('Protected route accessed successfully');
});

module.exports = router;
