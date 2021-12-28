const blog_config = {
  limit: 10,
}

// FUNC : Get posts from API (JSON Placeholder)
async function loadPostsFromAPI() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit${blog_config.limit}`
  )
  const posts = await res.json()
  return posts
}

// Init
loadPostsFromAPI()
