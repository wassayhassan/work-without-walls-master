const Job = require("../models/JobModel");
const cloudinary = require("cloudinary").v2;
const Review = require("../models/review.Model");
const asyncHandler = require("express-async-handler");
const Status = {
  Active: "active",
  Inactive: "inactive",
  Assigned: "assigned",
  Completed: "completed",
  Canceled: "cancelled",
  Closed: "closed",
  Deleted: "deleted",
};

const uploadImage = async (image) => {
  //complete
  const { secure_url } = await cloudinary.uploader.upload(image, {
    use_filename: true,
    folder: "users",
  });

  return secure_url;
};

const addNewJob = asyncHandler(async (req, res) => {
  console.log("req is: ", req.user);
  //complete
  try {
    console.clear();
    const {
      gigTitle,
      description,
      budget,
      category,
      reviews = null,
      options,
      completedAt,
      assignedAt,
      canceledAt,
      deletedAt,
      createdAt,
      createdBy = req.user._id,
      assignedTo = null,
    } = req.body;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const im1 = req?.files?.im1;
    let img1 = null;
    if (im1) {
      img1 = await uploadImage(im1?.tempFilePath);
    }
    Job.createdAt=date;
    
    const jobs = new Job({
      gigTitle,
      description,
      budget,
      category,
      reviews,
      options,
      img1,
      createdAt,
      completedAt,
      createdBy,
      canceledAt,
      deletedAt,
      assignedAt,
      assignedTo,
    });
    jobs.save().then(() => {
      console.log("Job Created");
    });
    res.status(201).json({ message: "Job Created", id: req.params.id });
  } catch (err) {
    console.log("Here");
    res.status(300).json({ message: err.message });
  }
});

const updateJobHandler = asyncHandler(async (req, res) => {
  try {
    const oldJob = await Job.findOne({ _id: req.params.id });
    console.log("old job", oldJob)
    if (!oldJob) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const jobUpdate = req.body;

    if (jobUpdate.Status === Status.Inactive) {
      if (oldJob.status === Status.Assigned) {
        return res.status(400).json({
          message: "Job is already assigned",
        });
      } else if (jobUpdate.status === Status.Assigned) {
        return res.status(400).json({
          message: "Job is laready assigned",
        });
      }
      jobUpdate.assignedAt = new Date();
    } else if (jobUpdate.status === Status.Completed) {
      if (oldJob.status === Status.Completed) {
        return res.status(400).json({
          message: "Job is already completed",
        });
      }
      if (oldJob.status !== Status.Assigned) {
        return res.status(400).json({
          message: "Job is not assigned",
        });
      }
      if (oldJob.status === Status.Canceled) {
        return res.status(400).json({
          message: "Job is already canceled",
        });
      }
      if (oldJob.status === Status.Deleted) {
        return res.status(400).json({
          message: "Job is already deleted",
        });
      }
      jobUpdate.completedAt = new Date();
    } else if (jobUpdate.status === Status.Canceled) {
      if (oldJob.status === Status.Canceled) {
        return res.status(400).json({
          message: "Job is already canceled",
        });
      }
      if (oldJob.status !== Status.Assigned) {
        return res.status(400).json({
          message: "Job is not assigned",
        });
      }
      if (oldJob.status === Status.Completed) {
        return res.status(400).json({
          message: "Job is already completed",
        });
      }

      jobUpdate.canceledAt = new Date();
      jobUpdate.assignedTo = null;
    } else if (jobUpdate.status === Status.Deleted) {
      if (oldJob.status === Status.Deleted) {
        return res.status(400).json({
          message: "Job is already deleted",
        });
      }

      jobUpdate.deletedAt = new Date();
    }

    let Img1;
    console.clear();
    let imageFile = null
    if (req.files) {
      console.log("yayii we have file")
      Img1 = req.files.img1;
      imageFile = await uploadImage(Img1.tempFilePath);
    }
    // oldJob=oldJob[0];
    // oldJob.completedAt;
    // oldJob.assignedAt;
    // oldJob.canceledAt;
    // oldJob.deletedAt;
    if(imageFile){
      oldJob.img1 = imageFile;
    }
    oldJob.createdAt=new Date();
    oldJob.assignedTo = null;
    oldJob.gigTitle = jobUpdate.gigTitle;
    oldJob.description = jobUpdate.description;
    oldJob.options = jobUpdate.options;
    oldJob.category = jobUpdate.category;
    oldJob.budget = jobUpdate.budget;
    oldJob.reviews = jobUpdate.reviews;


    const update = await oldJob.save();

    return res.status(200).json({ message: " Updated Successfully" });
  } catch (e) {
    console.log("Cant respond", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  //conpleted
  try {
    const user = req?.user
    const oldjob = await Job.findOne({ createdBy: user?._id, id: req?.params?.od });
    Job.findByIdAndDelete(oldjob, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted");
        Job.deletedAt = new Date();
      }
    });

    return res.status(200).json({
      message: "GIG deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const getAllJobs = asyncHandler(async (req, res) => {
  let pageRequested = parseInt(req.query.page);
  pageRequested--;
  const pagelimit = 10;
  let searchkey = req.query.search;
  let category = []
  if(req.query.category === "all"){
    category = ["Web Development", "Database", "Content Writting", "Artifical Intelligence", "Game: Development","Machine Learning","App Development","DIP","Data Entry", "Data Entry"];
  }else{
    category.push(req.query.category);
  }
  try {
    if(req.query.search && req.query.search.length > 0){
      const totalDocs = await Job.countDocuments({'description': {$regex: searchkey, $options: 'i'}, category: {$in: category} });
      const job = await Job.find({ createdBy: { $nin: [req.user._id] }, 'description': {$regex: searchkey, $options: 'i'}, category: {$in: category} }).limit(pagelimit).skip(pagelimit * pageRequested).sort({createdAt: -1,  });
      let totalpages = Math.ceil(totalDocs/pagelimit);
      pageRequested++;
      res.status(200).json({message: "success",data: job,totalPages: totalpages, currentpage: pageRequested});
    }else{
      const totalDocs = await Job.countDocuments({ createdBy: { $nin: [req.user._id] }, category: {$in: category}  });
      const job = await Job.find({ createdBy: { $nin: [req.user._id] }, category: {$in: category}  }).limit(pagelimit).skip(pagelimit * pageRequested).sort({createdAt: -1,  });
      let totalpages = Math.ceil(totalDocs/pagelimit);
      pageRequested++;
      res.status(200).json({message: "success",data: job,totalPages: totalpages, currentpage: pageRequested});
    }
  } catch(error) {
    console.log(error);
  }
});
const getYourJobs = asyncHandler(async (req, res) => {
  try {
    const job = await Job.find({ createdBy: { $in: [req.user._id] } });
    res.status(200).json({ message: "success", data: job });
  } catch {
    console.log(error);
  }
});

const reviewJob = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const job = await Job.findById(req.params.id).populate("reviews");

    if (!job) {
      return res.status(404).json({
        message: "GIG not found",
      });
    }

    const reviewedBy = req.user._id;
    const reviewedTo =
      job.createdBy.toString() === req.user._id
        ? job.assignedTo
        : job.createdBy;

    if (
      job.reviews.find(
        (review) =>
          review.reviewedBy === reviewedBy && review.reviewedTo === reviewedTo
      )
    ) {
      return res.status(400).json({
        message: "Review already exists",
      });
    }

    const review = await Review.create({
      reviewedBy,
      reviewedTo,
      reviewOf: job._id,
      rating,
      comment,
    });

    job.reviews.push(review);
    if (job.reviews.length === 2) {
      job.status = Status.Closed;
    }

    await job.save();

    return res.status(201).json({
      message: "Review sent!",
      data: review.toJSON(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addNewJob,
  updateJobHandler,
  deleteJob,
  getAllJobs,
  reviewJob,
  getYourJobs
};
