//Models
const Blog = require('../models/blog');

// get blog by ID
exports.getBlogById = (req, res) => {
  const blogId = req.params.id;

  //find blog by ID - everything but dont select V property
  Blog.findById(blogId)
    .select('-__v')
    .exec((err, foundBlog) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(foundBlog);
    });
};

// add and save Blog
exports.createBlog = (req, res) => {
  const blogData = req.body;

  //get user data
  const blog = new Blog(blogData);

  if (req.user) {
    blog.userId = req.user.sub;
    blog.author = req.user.name;
  }

  blog.save((err, createdBlog) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(createdBlog);
  });
};
