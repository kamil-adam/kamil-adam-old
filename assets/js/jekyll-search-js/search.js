class jekyllSearch {
  constructor(dataSource, searchField, resultsList, siteURL) {
    this.dataSource = dataSource
    this.searchField = document.querySelector(searchField)
    this.resultsList = document.querySelector(resultsList)
    this.siteURL = siteURL

    this.displayResults = this.displayResults.bind(this)
  }

  fetchedData() {
    return fetch(this.dataSource)
      .then(blob => blob.json())
  }

  async findResults() {
    const data = await this.fetchedData()
    return data.filter(item => {
      const regex = new RegExp(this.searchField.value, 'gi')
      return item.title.match(regex) || item.content.match(regex)
    })
  }

  async displayResults() {
    const results = await this.findResults()
    const html = results.map(item => {
      return `
        <dt class="result">
          <a class="posts-nav-item"  href="${this.siteURL + item.url}">
            <span class="posts-nav-item-date">
              <time datetime="${item.date}" class="date">
                ${item.date}
              </time>
            </span>
            ${item.title}
          </a>
        </dt>
        <dd>
          <p>${item.description}</p>
        </dd>`
    }).join('')
    if ((results.length == 0) || (this.searchField.value == '')) {
      this.resultsList.innerHTML = `<p>Nic nie znaleziono</p>`
    } else {
      this.resultsList.innerHTML = html
    }
  }

  init() {
    const url = new URL(document.location)
    if (url.searchParams.get("search")) {
      this.searchField.value = url.searchParams.get("search")
      this.displayResults()
    }
    this.searchField.addEventListener('keyup', () => {
      this.displayResults()
      url.searchParams.set("search", this.searchField.value)
      window.history.pushState('', '', url.href)
    })
    this.searchField.addEventListener('keypress', event => {
      if (event.keyCode == 13) {
        event.preventDefault()
      }
    })
  }
}
