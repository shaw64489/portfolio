const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog');
//SERVICE
const authService = require('../services/auth');

//get Blog by ID
router.get('/:id', blogController.getBlogById);

// add a blog
router.post(
  '',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.createBlog
);

//update Blog
router.patch(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.updateBlog
);

module.exports = router;
