
const express = require('express');
const router = express.Router();
const { aksaraController } = require('../controllers/aksaraController');
const { check, validationResult } = require('express-validator');

// Middleware to validate inputs
const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', [
  check('name').notEmpty(),
  check('description').notEmpty(),
  validateInputs
], aksaraController.createAksara);

router.get('/:id', aksaraController.readAksara);

router.get('/', aksaraController.listAllAksara);

module.exports = router;
