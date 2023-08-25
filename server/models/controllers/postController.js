const Post = require('../Post');

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
};
