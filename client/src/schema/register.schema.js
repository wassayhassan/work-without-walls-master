import * as Yup from "yup";

const cnic = "^[0-9]{5}-[0-9]{7}-[0-9]$";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterSchema = Yup.object({
  firstname: Yup.string().required("First Name is required !!"),
  lastname: Yup.string().required("Last Name is required !!"),
  email: Yup.string().required("Email is required").email(),
  CNIC: Yup.string()
    .required("CNIC is required !!")
    .matches(cnic, "CNIC format is not valid !!"),
  password: Yup.string()
    .required("Password is required !!")
    .min(8, "Password length should be minimum of 8 !!"),
  phone: Yup.string().required("Phone is required !!").matches(phoneRegExp, "Phone number is not valid"),
  cnicFront: Yup.mixed().required("Cnic Front is required !!"),
  cnicBack: Yup.mixed().required("Cnic Back is required !!"),
});

export { RegisterSchema };
