export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  searchPhoto() {
    console.log(this);
    const KEY = '28938299-540a22f16341f89f8ae18ff1c';
    const url = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true$page=${this.page}&per_page=40`;
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.incrementPage();
        return res.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
