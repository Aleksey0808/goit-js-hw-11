import axios from 'axios';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchPhoto } from './js/fetchPhoto';
import showGaleryPhoto from './js/showGaleryPhoto';
import ApiService from './js/pixabay-service';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onloadMore);

const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();

  clearMarcup();

  apiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  if (apiService.searchQuery === '') {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  apiService.resetPage();
  apiService.searchPhoto().then(appendHitsMarcup);
}

function onloadMore() {
  apiService.searchPhoto().then(appendHitsMarcup);
}

function appendHitsMarcup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', showGaleryPhoto(hits));
}

function clearMarcup() {
  refs.gallery.innerHTML = '';
}
