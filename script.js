// FUNC : Get posts from API (JSON Placeholder)
async function loadPostsFromAPI() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return posts
}

// Init
loadPostsFromAPI()
