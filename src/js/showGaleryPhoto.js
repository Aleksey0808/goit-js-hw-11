import SimpleLightbox from 'simplelightbox';

export default function showGaleryPhoto(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <a href="${largeImageURL}">
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <br> ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br> ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br> ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads <br> ${downloads}</b>
    </p>
  </div>
</div>
</a>
    `;
      }
    )
    .join('');
}

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
