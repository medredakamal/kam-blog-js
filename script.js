let blogconfig = {
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
    `https://jsonplaceholder.typicode.com/posts?_limit=${blogconfig.limit}&_page=${blogconfig.page}`
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
    if (null == document.querySelector('#kamblog__pagination')) {
      renderPagination()
    }
  }
}

// FUNC : Render Pagination
async function renderPagination() {
  const paginationDOM = document.createElement('div')
  const prevDOM = document.createElement('button')
  const nextDOM = document.createElement('button')

  paginationDOM.setAttribute('id', 'kamblog__pagination')
  paginationDOM.classList.add('kamblog__pagination')
  prevDOM.classList.add('kamblog__prev')
  prevDOM.innerText = 'Previous'
  nextDOM.classList.add('kamblog__next')
  nextDOM.innerText = 'Next'
  paginationDOM.appendChild(prevDOM)
  paginationDOM.appendChild(nextDOM)

  appDOM.appendChild(paginationDOM)

  // Event Listeners
  prevDOM.addEventListener('click', () => {
    if (blogconfig.page === 0) {
      blogconfig.page = 0
    } else if (blogconfig.page < 0) {
      blogconfig.page = 0
    } else {
      blogconfig.page--
    }
    contentDOM.innerHTML = ''

    renderPosts()
    console.log(blogconfig.page)
  })

  nextDOM.addEventListener('click', () => {
    blogconfig.page++
    contentDOM.innerHTML = ''

    renderPosts()
    console.log(blogconfig.page)
  })
}

// Init
setTimeout(() => {
  renderPosts()
}, 2000)
