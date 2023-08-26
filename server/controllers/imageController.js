const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

module.exports = {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided.' });
      }

      const newImage = new Image({
        filename: req.file.filename,
        post: req.body.postId,
      });
      await newImage.save();

      res.redirect('/posts/' + req.body.postId);
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while uploading the image.' });
    }
  },

  async deleteImage(req, res) {
    try {
      const { imageId } = req.params;
      const image = await Image.findByIdAndDelete(imageId);

      if (image) {
        const imagePath = path.join(__dirname, '..', 'public', 'uploads', image.filename);
        fs.unlinkSync(imagePath);
      }

      res.redirect('/posts/' + req.body.postId);
    } catch (error) {
      res.status(500).render('posts', { error: 'An error occurred while deleting the image.' });
    }
  },

  async getImageGallery(req, res) {
    try {
      const images = await Image.find().populate('post');
      res.render('gallery', { images });
    } catch (error) {
      res.status(500).render('gallery', { error: 'An error occurred while fetching images.' });
    }
  },
};
