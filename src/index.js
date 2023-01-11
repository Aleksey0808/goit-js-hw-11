import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import showGaleryPhoto from './js/showGaleryPhoto';
import ApiService from './js/pixabay-service';
import './css/styles.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onloadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  alertError: false,
});

const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();

  clearMarcup();

  apiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  if (apiService.searchQuery === '') {
    return Notify.info(
      'Nothing entered in the search box.'
    );
  }

  apiService.resetPage();
  apiService.searchPhoto().then(appendHitsMarcup);
}

function onloadMore() {
  apiService.searchPhoto().then(appendHitsMarcup);
}

function appendHitsMarcup(hits) {
  if (!hits.length) {
    return Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  refs.gallery.insertAdjacentHTML('beforeend', showGaleryPhoto(hits));
  lightbox.refresh();
}

function clearMarcup() {
  refs.gallery.innerHTML = '';
}
