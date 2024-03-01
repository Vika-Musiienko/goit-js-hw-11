
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '42576318-0e1c04293cd098153cdda1833';
const BASE_URL = 'https://pixabay.com/api/';
const loader = document.querySelector('.loader');

export function fetchData(searchQuery) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const loader = document.querySelector('.loader');
  loader.style.display = 'block';

  return fetch(`${BASE_URL}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK!');
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        iziToast.error({
          fontSize: 'large',
          close: false,
          position: 'topRight',
          messageColor: 'white',
          timeout: 2000,
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      return data;
    })
    .catch(error => console.error('Error fetching data:', error));
}


