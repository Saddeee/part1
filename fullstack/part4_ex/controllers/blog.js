const blogRouter = require('express').Router()
const Blog = require("../modules/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((result) => {
    response.json(result);
  });
});

blogRouter.post("/", (request, response)=>{
    const body = request.body
    console.log(body)
    const newBlog = new Blog({
        title: body.titel,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    newBlog.save().then(savedNote=>{
        response.json(savedNote)
    }).catch(error=>{
        console.log(error)
        response.status(404).end()
    })
})

module.exports = blogRouter