const { Topic } = require("../models/topic.model");
const { User } = require("../models/user.model");

async function getAllTopics(ctx) {
  try {
    const allTopics = await Topic.find({});
    ctx.status = 200;
    ctx.body = allTopics;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function getTopicByTitle(ctx) {
  try {
    const { title } = ctx.request.body;
    const foundTopic = await Topic.findOne({ title });
    ctx.status = 200;
    ctx.body = foundTopic;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function postOneTopic(ctx) {
  try {
    const { title, content, tags } = ctx.request.body;
    const { id } = ctx.request.params;
    console.log(id);
    const topicToPost = new Topic({ title, author: id, content, tags });
    const user = await User.findOne({ _id: id });
    user.posts.push(topicToPost._id);

    await user.save();
    await topicToPost.save();
    ctx.status = 200;
    ctx.body = topicToPost;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function deleteOneTopic(ctx) {
  try {
    const { title } = ctx.request.body;
    await Topic.findOneAndRemove({ title });
    ctx.status = 200;
    ctx.body = "Topic successfully deleted";
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function modifyTopicTitle(ctx) {
  try {
    const { title, newTitle } = ctx.request.body;
    const modifiedTopic = await Topic.findOneAndUpdate(
      { title },
      { title: newTitle },
      {
        new: true,
      }
    );
    ctx.status = 200;
    ctx.body = modifiedTopic;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

module.exports = {
  getAllTopics,
  getTopicByTitle,
  postOneTopic,
  deleteOneTopic,
  modifyTopicTitle,
};
