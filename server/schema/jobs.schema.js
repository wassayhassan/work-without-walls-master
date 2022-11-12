const yup = require("yup");

const JobRequestSchema = yup.object().shape({
  body: yup.object().shape({
    gigTitle: yup.string().required("Gig Title is required"),
  }),
});

module.exports = JobRequestSchema;
