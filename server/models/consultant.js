const mongoose = require('mongoose');
const userTypes = require('../utils/userTypes');
const { addUser } = require('./user');

const consultantSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
    // TODO: Specify major enum
  },
  yearOfGraduation: {
    type: Number,
    required: true,
    max: new Date().getFullYear() + 1,
  },
  currentPlacement: {
    type: String,
    required: false,
    maxLength: 255,
    default: '',
  },
  bio: {
    type: String,
    required: false,
    maxLength: 255,
    default: '',
  },
  reported: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Consultant = mongoose.model('consultant', consultantSchema);

const addConsultant = (
  email,
  password,
  displayName,
  major,
  yearOfGraduation,
  currentPlacement,
  bio
) =>
  Consultant({
    displayName,
    major,
    yearOfGraduation,
    currentPlacement,
    bio,
  })
    .save()
    .then(({ _id }) =>
      addUser(_id.toString(), email, password, userTypes.CONSULTANT)
    );

const getConsultantById = (uid) => Consultant.findById(uid).exec();

const updateConsultant = (uid, attr) =>
  getConsultantById(uid)
    .then((obj) =>
      obj.overwrite({
        ...obj.toObject(),
        ...attr,
      })
    )
    .then((obj) => obj.save());

    
const searchConsultant = (searchInput) => Consultant.find({major: searchInput}).exec();

const filterAgeGreater = (filterInput) => Consultant.find({$query: {}, $orderby:{age:filterInput}})



module.exports = { addConsultant, getConsultantById, updateConsultant, searchConsultant, filterAgeGreater};
