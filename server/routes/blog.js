const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog');
//SERVICE
const authService = require('../services/auth');

//get published blogs
router.get('', blogController.getBlogs);

//get Blogs by me
router.get(
  '/me',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.getUserBlogs
);

//get Blog by ID
router.get('/:id', blogController.getBlogById);

//get published blog detail page
router.get('/s/:slug', blogController.getBlogBySlug);

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

//delete Blog
router.delete(
  '/:id',
  authService.checkJWT,
  authService.checkRole('siteOwner'),
  blogController.deleteBlog
);

module.exports = router;
