import axios from 'axios';

export function fetchPhoto(value) {
  const KEY = '28938299-540a22f16341f89f8ae18ff1c';
  const url = `https://pixabay.com/api/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true$page=1&per_page=40`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
