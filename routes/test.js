const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware for authentication
const Test = require('../models/Test');

// Create a new test
router.post('/', auth, async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const newTest = new Test({
      title,
      description,
      questions,
    });

    // Save the test to the database
    await newTest.save();

    res.json(newTest); // Return the newly created test
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all tests
router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a single test by ID
router.get('/:id', auth, async (req, res) => {
  const testId = req.params.id;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a test by ID
router.put('/:id', auth, async (req, res) => {
  const testId = req.params.id;
  const { title, description, questions } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    // Update test fields
    test.title = title;
    test.description = description;
    test.questions = questions;

    // Save the updated test
    await test.save();

    res.json(test); // Return the updated test
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a test by ID
router.delete('/:id', auth, async (req, res) => {
  const testId = req.params.id;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ msg: 'Test not found' });
    }

    // Delete the test
    await test.remove();

    res.json({ msg: 'Test deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
