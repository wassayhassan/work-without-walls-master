const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const uploadImage = async (image) => {
  //corrected
  const { secure_url } = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: "users",
  });

  return secure_url;
};
//wrap with asyncHandler to handle exceptions
const signup = asyncHandler(async (req, res) => {
  //corrected
  try {
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'custom',
      capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
    })
    
    const { cnicFront, cnicBack } = req.files;
    const { CNIC, password, firstname, lastname, email, phone } = req.body;
    const cnicBackImage = await uploadImage(cnicBack.tempFilePath);
    const cnicFrontImage = await uploadImage(cnicFront.tempFilePath);
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPaswword = await bcrypt.hash(password, salt);
    const user = new User({
      ...req.body,
      cnicFront: cnicFrontImage,
      cnicBack: cnicBackImage,
      password: hashedPaswword,
      stripeAccount:  account,
      userRole: "user",
      approve: false,
    });
    const userExist = await User.findOne({ CNIC });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    const dat = await stripe.accounts.update(
      account.id,
      {tos_acceptance: {date: new Date(), ip: req.ip}}
    );
    user.save().then(() => {
      res.status(200).json({
        _id: user.id,
        CNIC: user.CNIC,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        title:user.title,
        stripeAccount: user.stripeAccount,
        description:user.description,
        rate:user.rate,
        skill1:user.skill1,
        skill2:user.skill2,
        skill3:user.skill3,
        lang1:user.lang1,
        lang2:user.lang2,
        lang3:user.lang3,
        workHistory:user.workHistory,
        token: generateTOKEN(user._id),
        approve: false,
        userrole: "user",

      });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

//generate tokens
const generateTOKEN = (id) => {
  //corrected
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const userUpdateHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const {
    name,
    title,
    rate,
    description,
    workHistory,
    skill1,
    skill2,
    skill3,
    lang1,
    lang2,
    lang3,
  } = req.body;

  let profileImg;


  console.clear();

  if (req.files) {
    
    profileImg = req.files.profileImg.tempFilePath;
    profileImg = await uploadImage(profileImg);
  }
  let userDB = await User.find({ _id: id });
  console.log(userDB)
  userDB = userDB[0];

  if (!userDB) {
    res.status(400).send("User does not exist");
  }


  userDB.name = name;
  userDB.title = title;
  userDB.rate = rate;
  userDB.description = description;
  userDB.workHistory = workHistory;
  userDB.skill1 = skill1;
  userDB.skill2 = skill2;
  userDB.skill3 = skill3;
  userDB.lang1 = lang1;
  userDB.lang2 = lang2;
  userDB.lang3 = lang3;

  if (profileImg) {
    userDB.profileImg = profileImg;
  }

  const update = await userDB.save();

  return res
    .status(200)
    .json({ message: "success", data:{
      _id: userDB._id,
      firstname: userDB.firstname,
      lastname: userDB.lastname,
      phone: userDB.phone,
      email: userDB.email,
      CNIC: userDB.CNIC,
      profileImg:userDB.profileImg,
      title:userDB.title,
    description:userDB.description,
    rate:userDB.rate,
    skill1:userDB.skill1,
    skill2:userDB.skill2,
    skill3:userDB.skill3,
    lang1:userDB.lang1,
    lang2:userDB.lang2,
    lang3:userDB.lang3,
    workHistory:userDB.workHistory,
    }});
    
});
//@desc get getsingleuserprofile
//route  get /api//user/:id
//access private
const getSingleUser = asyncHandler(async (req, res) => {
  //corrected
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      data: {
       user:{
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          CNIC: user.CNIC,
          profileImg:user.profileImg,
          title:user.title,
        description:user.description,
        rate:user.rate,
        skill1:user.skill1,
        skill2:user.skill2,
        skill3:user.skill3,
        lang1:user.lang1,
        lang2:user.lang2,
        lang3:user.lang3,
        workHistory:user.workHistory,
        },
      }
    });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});
const getUserById = async(req, res) => {
  try{
    let user = await User.findById(req.params.id);
    res.status(200).json({name: user.firstname + ' ' + user.lastname, profileImg: user.profileImg, id: user._id})
  }catch(err){
    res.status(400).json(err);
  }
   
    
}

module.exports = { signup, userUpdateHandler, getSingleUser, getUserById};
