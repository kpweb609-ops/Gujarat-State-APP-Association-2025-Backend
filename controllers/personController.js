const Person = require('../models/Person');

// Get all persons
const getPersons = async (req, res) => {
  try {
    const persons = await Person.find().populate('person_designation');
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single person
const getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id).populate('person_designation');
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create person
const createPerson = async (req, res) => {
  const person = new Person({
    person_name: req.body.person_name,
    person_photo: req.body.person_photo,
    person_designation: req.body.person_designation,
    person_role: req.body.person_role,
    person_mobile: req.body.person_mobile,
    person_batch: req.body.person_batch
  });

  try {
    const newPerson = await person.save();
    await newPerson.populate('person_designation');
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update person
const updatePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    person.person_name = req.body.person_name || person.person_name;
    person.person_photo = req.body.person_photo || person.person_photo;
    person.person_designation = req.body.person_designation || person.person_designation;
    person.person_role = req.body.person_role || person.person_role;
    person.person_mobile = req.body.person_mobile || person.person_mobile;
    person.person_batch = req.body.person_batch || person.person_batch;

    const updatedPerson = await person.save();
    await updatedPerson.populate('person_designation');
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete person
const deletePerson = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
};