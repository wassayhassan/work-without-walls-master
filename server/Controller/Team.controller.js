const Team = require("../models/Team.model");
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

const addNewTeam = asyncHandler(async (req, res) => {

  try {
    console.clear();
    const {
    title,
    leaderName,
    category,
      reviews = null,
     responsibility,
      completedAt,
      assignedAt,
      canceledAt,
      membersCount,
      createdBy = req.user._id,
      assignedTo = null,
    } = req.body;
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const img= req?.files?.logo;
    let logo = null;
    if (img) {
      logo = await uploadImage(img?.tempFilePath);
    }
    Team.createdAt=date;
    let teamMembers = [];
    for(let i = 0; i < membersCount; i++){
      teamMembers.push({id: i, name: `Member ${i+ 1}`, responsibility: 'Responsiblity'});
    }
    
    const teams = new Team({
      title,
    leaderName,
    teamMembers,
      reviews,
      membersCount,
     responsibility,
      completedAt,
      assignedAt,
      canceledAt,
      createdBy,
      assignedTo,
      category,
      reviews,
      logo,
    });
    const data = await teams.save();
    res.status(200).json(data);
   

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateTeamHandler = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id)
    const oldTeam = await Team.findOne({ createdBy: req.params.id }); 
    console.log("old Team",oldTeam)
    if (!oldTeam) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const TeamUpdate = req.body;

    if (TeamUpdate.Status === Status.Inactive) {
      if (oldTeam.status === Status.Assigned) {
        return res.status(400).json({
          message: "Team is already assigned",
        });
      } else if (TeamUpdate.status === Status.Assigned) {
        return res.status(400).json({
          message: "Team is laready assigned",
        });
      }
      TeamUpdate.assignedAt = new Date();
    } else if (TeamUpdate.status === Status.Completed) {
      if (oldTeam.status === Status.Completed) {
        return res.status(400).json({
          message: "Team is already completed",
        });
      }
      if (oldTeam.status !== Status.Assigned) {
        return res.status(400).json({
          message: "Team is not assigned",
        });
      }
      if (oldTeam.status === Status.Canceled) {
        return res.status(400).json({
          message: "Team is already canceled",
        });
      }
      if (oldTeam.status === Status.Deleted) {
        return res.status(400).json({
          message: "Team is already deleted",
        });
      }
      TeamUpdate.completedAt = new Date();
    } else if (TeamUpdate.status === Status.Canceled) {
      if (oldTeam.status === Status.Canceled) {
        return res.status(400).json({
          message: "Team is already canceled",
        });
      }
      if (oldTeam.status !== Status.Assigned) {
        return res.status(400).json({
          message: "Team is not assigned",
        });
      }
      if (oldTeam.status === Status.Completed) {
        return res.status(400).json({
          message: "Team is already completed",
        });
      }

      TeamUpdate.canceledAt = new Date();
      TeamUpdate.assignedTo = null;
    } else if (TeamUpdate.status === Status.Deleted) {
      if (oldTeam.status === Status.Deleted) {
        return res.status(400).json({
          message: "Job is already deleted",
        });
      }
    }

    let Img1;
    console.clear();
    let imageFile = null
    if (req.files) {
      Img1 = req.files.logo;
      imageFile = await uploadImage(Img1.tempFilePath);
    }
    if(imageFile){
        oldTeam.logo = imageFile;
    }
    oldTeam.createdAt=new Date();
    oldTeam.assignedTo = null;
    oldTeam.title = TeamUpdate.title;
    oldTeam.leaderName = TeamUpdate.leaderName;
    oldTeam.teamMembers = TeamUpdate.teamMembers;
    oldTeam.category = TeamUpdate.category;
    oldTeam.responsibility = TeamUpdate.responsibility;
    oldTeam.reviews = TeamUpdate.reviews;


    const update = await oldTeam.save();

    return res.status(200).json({ message: " Updated Successfully" });
  } catch (e) {
    console.log("Cant respond", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const deleteTeam = asyncHandler(async (req, res) => {
  //conpleted
  try {
    const user = req?.user
    const oldteam = await Team.findOne({ createdBy: user?._id, id: req?.params?.od });
    Team.findByIdAndDelete(oldteam, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(" Team Deleted");
      }
    });

    return res.status(200).json({
      message: "Team deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

const getAllTeams = asyncHandler(async (req, res) => {
  try {
    const team = await Team.find({ createdBy: { $nin: [req.user._id] } });
    res.status(200).json({ message: "success", data: team });
  } catch {
    console.log(error);
  }
});
const getYourTeam = asyncHandler(async (req, res) => {
  try {
    const team = await Team.find({ createdBy: { $in: [req.user._id] } });
    res.status(200).json({ message: "success", data: team });
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

const updateTeam = async(req, res) => {
  try{
    const img= req?.files?.logo;
    let logo = null;
    if (img) {
      logo = await uploadImage(img?.tempFilePath);
      req.body.logo = logo;
    }

    console.log(req.body);
     if(req.body.teamMembers[0].id !== 0){
        let teamMembers = req.body.teamMembers.map((mem)=> {
          return JSON.parse(mem);
        })
        req.body.teamMembers = teamMembers;
     }

   let data = await Team.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
}
const getTeamById = async(req, res) => {
  try{
    let data = await Team.findOne({_id: req.params.id});
    console.log(data)
    res.status(200).json(data);
  }catch(err){
    res.status(500).json(err);
  }
}
const deleteTeamById = async(req, res)=> {
  try{
    let data = await Team.findByIdAndDelete(req.params.id)
    res.status(200).json(data);
  }catch(err){
    res.status(500).json(err);
  }
}

const getTeamByCategoryAndId = async(req, res) => {
  try{
    let data = await Team.findOne({createdBy: req.params.id, category: req.params.category});
    res.status(200).json(data);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
}
const getTeamsByCategory = async(req, res) => {
  try{
     const data = await Team.find({category: req.params.category});
     console.log(data)
     res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
}
const getTeamsCountByUserId = async(req, res)=> {
  try{
   const data = await Team.countDocuments({createdBy: req.params.id});
   res.status(200).json({count: data});
  }catch(err){
    res.status(400).json(err)
  }
}


module.exports = {
  addNewTeam,
  updateTeamHandler,
  updateTeam,
  deleteTeam,
  getAllTeams,
  reviewJob,
  getYourTeam,
  getTeamById,
  deleteTeamById,
  getTeamsCountByUserId,
  getTeamByCategoryAndId,
  getTeamsByCategory
};
