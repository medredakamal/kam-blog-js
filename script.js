const blog_config = {
  limit: 10,
}

// DOMs
const contentDOM = document.getElementById('kamblog__content')
const loadingDOM = document.getElementById('kamblog__loading')
const searchbarDOM = document.getElementById('kamblog__searchbar')

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
    loadingDOM.classList.add('hide')
    setTimeout(() => {
      loadingDOM.parentElement.removeChild(loadingDOM)
    }, 200)
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
setTimeout(() => {
  renderPosts()
}, 2000)

// Event Listeners
