const Tag = require('../models/Tag');

module.exports = {
  async createTag(req, res) {
    try {
      const { name } = req.body;
      const newTag = new Tag({ name });
      await newTag.save();
      res.redirect('/tags');
    } catch (error) {
      res.status(500).render('tags', { error: 'An error occurred while creating the tag.' });
    }
  },

  async updateTag(req, res) {
    try {
      const { tagId } = req.params;
      const { name } = req.body;
      await Tag.findByIdAndUpdate(tagId, { name });
      res.redirect('/tags');
    } catch (error) {
      res.status(500).render('tags', { error: 'An error occurred while updating the tag.' });
    }
  },

  async deleteTag(req, res) {
    try {
      const { tagId } = req.params;
      await Tag.findByIdAndDelete(tagId);
      res.redirect('/tags');
    } catch (error) {
      res.status(500).render('tags', { error: 'An error occurred while deleting the tag.' });
    }
  },
};
