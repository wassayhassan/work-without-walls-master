const User = require('../models/User');
const approve = async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      approve: req.body.approve,
    },
    (err, user) => {
      if (err) console.log('Error Found');
      res.json({
        message: 'User Update Successful',
        user,
      });
    }
  );
};



const deleteA = async (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.json({ err });
    } else {
      res.json({ user, message: 'User deleted successfully' });
    }
  });
};

module.exports = {
  approve,
  deleteA,

};
