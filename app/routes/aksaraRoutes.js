
const express = require('express');
const router = express.Router();
const { aksaraController } = require('../controllers/aksaraController');
const { check, validationResult } = require('express-validator');
const { route } = require('./userRoutes');

// Middleware to validate inputs
const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * /api/aksara:
 *   post:
 *     summary: Create a new aksara
 *     tags: [Aksara]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aksara 1"
 *               description:
 *                 type: string
 *                 example: "This is the first aksara"
 *     responses:
 *       200:
 *         description: Aksara created successfully
 *       400:
 *         description: Error occurred
 */
router.post('/', [
  check('name').notEmpty(),
  check('description').notEmpty(),
  validateInputs
], aksaraController.createAksara);

/**
 * @swagger
 * /api/aksara/{id}:
 *   get:
 *     summary: Get aksara by ID
 *     tags: [Aksara]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the aksara
 *     responses:
 *       200:
 *         description: Aksara retrieved successfully
 *       400:
 *         description: Error occurred
 */
router.get('/:id', aksaraController.readAksara);

/**
 * @swagger
 * /api/aksara/:
 *   get:
 *     summary: Get list of all aksara
 *     tags: [Aksara]
 *         schema:
 *           type: string
 *         required: true
 *         description: all aksara
 *     responses:
 *       200:
 *         description: Aksara retrieved successfully
 *       400:
 *         description: Error occurred
 */
router.get('/', aksaraController.listAllAksara);

module.exports = router;
