const Post = require('../models/Post');

module.exports = {
  async createPost(req, res) {
    try {
      const { title, content, category, tags } = req.body;
      const newPost = new Post({
        title,
        content,
        user: req.user._id,
        category,
        tags,
      });
      await newPost.save();
      res.redirect('/posts');
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while creating the post.' });
    }
  },

  async updatePost(req, res) {
    try {
      const { postId } = req.params;
      const { title, content, category, tags } = req.body;
      await Post.findByIdAndUpdate(postId, { title, content, category, tags });
      res.redirect('/posts');
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while updating the post.' });
    }
  },

  async deletePost(req, res) {
    try {
      const { postId } = req.params;
      await Post.findByIdAndDelete(postId);
      res.redirect('/posts');
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while deleting the post.' });
    }
  },

  async getPostsPage(req, res) {
    try {
      const posts = await Post.find().populate('user').populate('category').populate('tags').populate('images');
      res.render('posts', { posts });
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while fetching posts.' });
    }
  },
  //search 
    async searchPosts(req, res) {
    try {
      const query = req.query.q;
      const posts = await Post.find({ $text: { $search: query } }).populate('user').populate('category').populate('tags').populate('images');
      res.render('posts', { posts });
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while searching for posts.' });
    }
  },

  async getPaginatedPosts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const posts = await Post.find().skip(skip).limit(limit).populate('user').populate('category').populate('tags').populate('images');
      res.render('posts', { posts });
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while fetching paginated posts.' });
    }
  },

  async getPostsApi(req, res) {
    try {
      const posts = await Post.find().populate('user').populate('category').populate('tags').populate('images');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
  },
};