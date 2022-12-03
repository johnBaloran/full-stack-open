const Blog = require("../models/blogEntry");
const blogRouter = require("express").Router();

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);
  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
