const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const ProjectSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
  },
  projectname: {
    type: String,
    require: true,
  },
  giturl: {
    type: String,
    require: true,
  },
  deploymentdate: {
    type: Date,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
});

const ProjectListSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
  },
  projectlist: {
    type: [String],
    require: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  moviewatchlist: {
    type: [String],
    require: false,
    default: null,
  },
  tvwatchlist: {
    type: [String],
    require: false,
    default: null,
  },
});
const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
const ProjectList = mongoose.model("ProjectList", ProjectListSchema);
module.exports = { User, Project, ProjectList };
