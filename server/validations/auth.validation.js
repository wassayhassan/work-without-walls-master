const yup = require("yup");
const cnic = "^[0-9]{5}-[0-9]{7}-[0-9]$";
const login = yup.object().shape({
  body: yup.object().shape({
    CNIC: yup
      .string()
      .required("CNIC is required")
      .matches(cnic, "CNIC should be this valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  }),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const register = yup.object().shape({
  body: yup.object().shape({
    firstname: yup.string().required("Name is required"),
    lastname: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email(),
    CNIC: yup
      .string()
      .required("CNIC is required")
      .matches(cnic, "CNIC should be this  valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  }),
});

module.exports = { login, register };
