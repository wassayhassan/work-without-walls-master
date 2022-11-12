const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'First Name is Required'],
  },
  lastname: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
  },
  password: {
    type: String,
    min: 4,
    max: 20,
    required: [true, 'Password is Required'],
  },
  CNIC: {
    type: String,
    required: [true, 'CNIC is Required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone Number is Required'],
  },
  cnicFront: {
    type: String,
    required: [true, 'Image Path is Required'],
  },
  cnicBack: {
    type: String,
    required: [true, 'Image Path is Required'],
  },
  approve: {
    type: Boolean,
    default: false,
  },
  userRole: {
    type: String,
    required: [true, 'Role of User Cannot be undefined'],
  },
  profileImg: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  rate: {
    type: String,
    default: '0',
  },
  description: {
    type: String,
    min: 3,
    default: '',
  },
  workHistory: {
    type: String,
    default: '',
  },
  skill1: {
    type: String,
    default: '',
  },
  skill2: {
    type: String,
    default: '',
  },
  skill3: {
    type: String,
    default: '',
  },
  lang1:{
    type:String,
    default: '',
  },
  lang2:{
    type:String,
    default: '',
  },
  lang3:{
    type:String,
    default: '',
  },
});

const User = model('User', userSchema, 'User');

module.exports = User;
