const blog_config = {
  limit: 10,
}

const contentDOM = document.getElementById('kamblog__content')
const helloDOM = document.getElementById('kamblog__hello')

// FUNC : Get posts from API (JSON Placeholder)
async function loadPostsFromAPI() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${blog_config.limit}`
  )
  const posts_data = await res.json()
  return posts_data
}

// FUNC : Render posts from API to DOM
async function renderPosts() {
  const posts_items = await loadPostsFromAPI()
  if (posts_items) {
    // Remove loading
    helloDOM.parentElement.removeChild(helloDOM)
    posts_items.forEach((post_item) => {
      const post_articleDOM = document.createElement('article')
      post_articleDOM.innerHTML = `
            <h3>${post_item.title}</h3>
            <p>${post_item.body}</p>`
      contentDOM.appendChild(post_articleDOM)
    })
  }
}

// Init
renderPosts()
