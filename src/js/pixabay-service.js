import axios from 'axios';

const API_KEY = '28938299-540a22f16341f89f8ae18ff1c';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async searchPhoto() {
    try {
      this.incrementPage();
      return await axios
        .get(BASE_URL, {
          params: {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: this.per_page,
          },
        })
        .then(response => response.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  incrementPage() {
    this.page += 1;
    this.per_page;
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
