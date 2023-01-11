import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import showGaleryPhoto from './js/showGaleryPhoto';
import ApiService from './js/pixabay-service';
import './css/styles.css';
import LoadMoreBth from './js/loadMoreBth';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('input'),
  loadMore: document.querySelector('.load-more'),
};

const loadMoreBth = new LoadMoreBth({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
loadMoreBth.refs.button.addEventListener('click', onloadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  alertError: false,
});

console.log(loadMoreBth);

function onSearch(e) {
  e.preventDefault();

  clearMarcup();

  apiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  if (apiService.searchQuery === '') {
    return Notify.failure('Nothing entered in the search box.');
  }

  loadMoreBth.show();
  loadMoreBth.disable();
  apiService.resetPage();
  apiService.searchPhoto().then(appendHitsMarcup);
}

function onloadMore() {
  apiService.searchPhoto().then(data => {
    appendHitsMarcup(data);
    loadMoreBth.enable();
  });
  loadMoreBth.disable();
}

function appendHitsMarcup(data) {
  const totalPage = Math.ceil(data.totalHits / apiService.per_page);
  if (apiService.page === totalPage) {
    return Notify.failure(
      'We`re sorry but you`ve reached the end of search results'
    );
  }
  console.log(totalPage);

  if (!data.hits.length) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  console.log(data.hits.length);
  Notify.success(`'Hooray! We found ${data.hits.length} images.'`);
  refs.gallery.insertAdjacentHTML('beforeend', showGaleryPhoto(data.hits));
  smoothScrolling();
  loadMoreBth.enable();
  lightbox.refresh();
}

function clearMarcup() {
  refs.gallery.innerHTML = '';
}

function smoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
