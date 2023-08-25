const Category = require('../models/Category');

module.exports = {
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const newCategory = new Category({ name });
      await newCategory.save();
      res.redirect('/categories');
    } catch (error) {
      res.status(500).render('categories', { error: 'An error occurred while creating the category.' });
    }
  },

  async updateCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      await Category.findByIdAndUpdate(categoryId, { name });
      res.redirect('/categories');
    } catch (error) {
      res.status(500).render('categories', { error: 'An error occurred while updating the category.' });
    }
  },

  async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      await Category.findByIdAndDelete(categoryId);
      res.redirect('/categories');
    } catch (error) {
      res.status(500).render('categories', { error: 'An error occurred while deleting the category.' });
    }
  },
};
