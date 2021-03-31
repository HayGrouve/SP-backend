const express = require('express');
const router = express.Router();
const FixturesModel = require('../models/Fixture');

//GET fixtures
router.get('/', async (req, res) => {
  try {
    const fixtures = await FixturesModel.find();
    res.json(fixtures);
  } catch (err) {
    res.json({ message: err });
  }
});

//CREATE fixtures
router.post('/', async (req, res) => {
  const fixture = new FixturesModel({
    fixture_id: req.body.fixture_id,
  });
  try {
    const savedFixture = await fixture.save();
    res.json(savedFixture);
  } catch (err) {
    res.json({ message: err });
  }
});

//SHOW fixtures
router.get('/:id', async (req, res) => {
  try {
    const fixtures = await FixturesModel.findById(req.params.id);
    res.json(fixtures);
  } catch (err) {
    res.json({ message: err });
  }
});
//DELETE fixtures
router.delete('/:id', async (req, res) => {
  try {
    const fixtures = await FixturesModel.findByIdAndDelete(req.params.id);
    res.json(fixtures);
  } catch (err) {
    res.json({ message: err });
  }
});
//UPDATE fixtures
router.patch('/:id', async (req, res) => {
  try {
    const fixtures = await FixturesModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      desc: req.body.desc,
    });
    res.json(fixtures);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
