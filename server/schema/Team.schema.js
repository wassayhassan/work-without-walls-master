const yup = require("yup");
const TeamRequestSchema = yup.object().shape({
  body: yup.object().shape({
    title: yup.string().required("Gig Title is required"),
    // logo:yup.mixed().required("File is required"),
    leaderName:yup.string().required("Leader Name is required"),
    category:yup.string().required("Category is required")
  }),
});

module.exports =TeamRequestSchema ;