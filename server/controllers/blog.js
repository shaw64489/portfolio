//Models
const Blog = require('../models/blog');
const slugify = require('slugify');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

exports.getBlogs = (req, res) => {
  Blog.find({status: 'published'})
    .sort({ 'createdAt': -1 })
    .exec((err, allPortfolios) => {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(allPortfolios);
    });
};

exports.getBlogBySlug = (req, res) => {
  const slug = req.params.slug;

  Blog.findOne({slug}, function(err, foundBlog) {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(foundBlog);
  });
}

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

// find user blogs
exports.getUserBlogs = (req, res) => {
  const userId = req.user.sub;

  Blog.find({userId}, function(err, userBlogs){
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(userBlogs);
  });
}

// update a blog by id
exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  Blog.findById(blogId, function(err, foundBlog) {
    if (err) {
      return res.status(422).send(err);
    }

    if (blogData.status && blogData.status === 'published' && !foundBlog.slug) {
      //create slug
      foundBlog.slug = slugify(foundBlog.title, {
        replacement: '-',    // replace spaces with replacement
        remove: null,        // regex to remove characters
        lower: true          // result in lower case
      })
    }
    
    foundBlog.set(blogData);
    foundBlog.updatedAt = new Date();
    foundBlog.save(function(err, savedBlog) {
      if (err) {
        return res.status(422).send(err);
      }

      return res.json(savedBlog);
    });
  });
};

// add and save Blog
exports.createBlog = (req, res) => {
  const lockId = req.query.lockId;

  // Whether there is any running or pending async function
  // lock.isBusy();

  // if lock is not busy - save
  if (!lock.isBusy(lockId)) {
    //if user is already saving a blog dont allow to save again
    // lock while request is being processed
    lock.acquire(lockId, (done) => {
        // async work
        const blogData = req.body;

        //get user data
        const blog = new Blog(blogData);

        if (req.user) {
          blog.userId = req.user.sub;
          blog.author = req.user.name;
        }

        blog.save((err, createdBlog) => {
          setTimeout(() => {
            done();
          }, 5000);
          if (err) {
            return res.status(422).send(err);
          }

          return res.json(createdBlog);
        });
      },
      function(err, ret) {
        // lock released
        if (err) console.error(err);
      });
    } else {
      return res.status(422).send({message: 'Blog is saving'})
    }
};

// Delete blog
exports.deleteBlog = (req, res) => {
  const blogId = req.params.id;

  Blog.deleteOne({ _id: blogId }, (err) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json({ status: 'DELETED' });
  });
}

