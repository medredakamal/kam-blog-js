const blogconfig = {
  limit: 9,
  page: 1,
}

// DOMs
const appDOM = document.getElementById('appcontainer')
const contentDOM = document.getElementById('kamblog__content')
const loadingDOM = document.getElementById('kamblog__loading')
const searchbarDOM = document.getElementById('kamblog__searchbar')

// FUNC : Get posts from API (JSON Placeholder)
async function loadPostsFromAPI() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${blogconfig.limit}&page=${blogconfig.page}`
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
    renderPagination()
  }
}

// FUNC : Render Pagination
async function renderPagination() {
  const paginationDOM = document.createElement('div')
  paginationDOM.classList.add('kamblog__pagination')
  paginationDOM.innerHTML = `
  <button id="kamblog__prev" class="kamblog__prev">Previous</button>
  <button id="kamblog__next" class="kamblog__next">Next</button>`
  appDOM.appendChild(paginationDOM)
}

// Init
setTimeout(() => {
  renderPosts()
}, 2000)

// Event Listeners
