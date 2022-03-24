const GhostAdminAPI = require('@tryghost/admin-api');
const createDomainLogger = require('../services/log');

const api = new GhostAdminAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_ADMIN_KEY,
  version: 'canary',
});
const LOG_DOMAIN = 'ghost-api';
const ghostLogger = createDomainLogger(LOG_DOMAIN);

async function getPosts(params) {
  try {
    const posts = await api.posts.browse(params);
    ghostLogger(`Get post success with params : ${params}`);
    return posts;
  } catch (error) {
    ghostLogger(`Can't get posts due to error : ${error}`);
    return [];
  }
}

async function readPost(id) {
  try {
    const post = await api.posts.read({ id });
    ghostLogger(`Read post success with id : ${id}`);
    return post;
  } catch (error) {
    ghostLogger(`Can't read post with ID ${id} due to error : ${error}`);
    return null;
  }
}

async function updatePost(post) {
  try {
    const updatedPost = await api.posts.edit(post);
    ghostLogger(`Update post success : ${updatedPost}`);
    return updatedPost;
  } catch (error) {
    ghostLogger(`Can't update post ${post} due to error : ${error}`);
    return null;
  }
}

async function createPost(post) {
  try {
    const createdPost = await api.posts.add(post, { source: 'html' });
    ghostLogger(`Create post success : ${post.title}`);
    return createdPost;
  } catch (error) {
    ghostLogger(`Can't update post ${post} due to error : ${error}`);
    return null;
  }
}

async function updateTag(tag) {
  try {
    const updatedTag = await api.tags.edit(tag);
    ghostLogger(`Update tag success : ${updatedTag}`);
    return updatedTag;
  } catch (error) {
    ghostLogger(`Can't update tag ${tag} due to error : ${error}`);
    return null;
  }
}

async function getTags(params) {
  try {
    const tags = await api.tags.browse(params);
    ghostLogger(`Get tags success with params: ${params}`);
    return tags;
  } catch (error) {
    ghostLogger(`Can't get tags with params ${params} due to error : ${error}`);
    return null;
  }
}

module.exports = {
  getPosts,
  updatePost,
  readPost,
  createPost,
  updateTag,
  getTags,
};
