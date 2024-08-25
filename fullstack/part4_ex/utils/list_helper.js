const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, current) => {
    return accumulator + current.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let greatestValue = blogs[0];
  blogs.forEach((blog) => {
      if (blog.likes > greatestValue.likes) {
          greatestValue = blog;
        }
    });
    return greatestValue;
};

const mostBlogs = (blogs)=>{
    const map = new Map()
    blogs.forEach(blog=>{
        if(map.has(blog.author) === true){
            let currentValue = map.get(blog.author)
            map.set(blog.author, currentValue+1)
        }else{
            map.set(blog.author, 1)
        }
    })
    let greatestAuthor = null;
    let greatestBlogs = 0;
  
    map.forEach((value, key) => {
      if (value > greatestBlogs) {
        greatestBlogs = value;
        greatestAuthor = key;
      }
    });

    return {
        author : greatestAuthor,
        blogs:greatestBlogs
    }

}

const mostLikes = (blogs)=>{
    const map = new Map()
    blogs.forEach(blog=>{
        if(map.has(blog.author)===true){
            const currentValue = map.get(blog.author)
            map.set(blog.author, currentValue+ blog.likes)
        }else{
            map.set(blog.author, blog.likes)
        }
    })
    let greatestAuthor = null
    let mostLikes = 0 
    map.forEach((value, key)=>{
        if(value > mostLikes){
            greatestAuthor = key
            mostLikes = value
        }
    })
    return{
        author: greatestAuthor,
        likes:mostLikes
    }
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs,mostLikes };
