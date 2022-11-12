const Message = require('../models/home');
const Mess = async (req, res) => {
  try {
    console.log(req.body);
    Message.create(req.body);
    res.json({ message: 'message sent' });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { Mess };
