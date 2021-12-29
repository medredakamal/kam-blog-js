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
  loadingDOM.classList = 'kamblog__loading'
  const posts_items = await loadPostsFromAPI()
  if (posts_items) {
    // Remove loading
    loadingDOM.classList.add('hide_animation')
    setTimeout(() => {
      loadingDOM.classList.add('hidden')
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
  const counterDOM = document.createElement('div')
  const counterTextDOM = document.createElement('span')
  const counterNumberDOM = document.createElement('span')

  paginationDOM.setAttribute('id', 'kamblog__pagination')
  paginationDOM.classList.add('kamblog__pagination')
  prevDOM.classList.add('kamblog__prev')
  prevDOM.innerText = 'Previous'
  nextDOM.classList.add('kamblog__next')
  nextDOM.innerText = 'Next'

  counterDOM.classList.add('kamblog__counter')
  counterTextDOM.classList.add('kamblog__countertext')
  counterNumberDOM.classList.add('kamblog__counternumber')
  counterNumberDOM.setAttribute('id', 'kamblog__counternumber')

  counterTextDOM.innerText = 'Page: '
  counterNumberDOM.innerText = blogconfig.page || 0

  paginationDOM.appendChild(prevDOM)
  paginationDOM.appendChild(nextDOM)

  counterDOM.appendChild(counterTextDOM)
  counterDOM.appendChild(counterNumberDOM)

  appDOM.appendChild(paginationDOM)
  appDOM.appendChild(counterDOM)

  // Event Listeners
  prevDOM.addEventListener('click', () => {
    if (blogconfig.page == 0 || blogconfig.page <= 1) {
      blogconfig.page = 1
    } else {
      blogconfig.page--
      contentDOM.innerHTML = ''
      renderPosts()
      updateCounter()
    }
  })

  nextDOM.addEventListener('click', () => {
    blogconfig.page++
    contentDOM.innerHTML = ''
    renderPosts()
    updateCounter()
  })
}

async function updateCounter() {
  const getCounter = document.getElementById('kamblog__counternumber')
  getCounter.innerText = blogconfig.page
}

// Init
setTimeout(() => {
  renderPosts()
}, 2000)
