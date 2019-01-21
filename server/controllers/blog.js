//Models
const Blog = require('../models/blog');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

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

// update a blog by id
exports.updateBlog = (req, res) => {
  const blogId = req.params.id;
  const blogData = req.body;

  Blog.findById(blogId, function(err, foundBlog) {
    if (err) {
      return res.status(422).send(err);
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


