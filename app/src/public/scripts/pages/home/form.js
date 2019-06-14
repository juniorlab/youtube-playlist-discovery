import {formDataToJSON, getURLParams} from './helpers';
import {updatePlaylists} from './playlists';

window.addEventListener('load', () => {
  document.getElementById('playlistForm')
    .addEventListener('submit', onPlaylistSubmit);
});

async function onPlaylistSubmit(e) {
  e.preventDefault();
  const form = e.target;
  // Get submit button
  const submit = Array.from(form.children).slice(-1)[0].children[0];
  // and disable it
  submit.setAttribute('disabled', 'disabled');

  // https://developer.mozilla.org/ru/docs/Web/API/FormData/FormData
  const formData = new FormData(form);
  let jsonData = {
    id: '',
    name: '',
  };
  jsonData = Object.assign(jsonData, formDataToJSON(formData));
  // Сначала пользователь вставляет url плейлиста. Затем нам надо взять оттуда параметр list
  jsonData.id = getURLParams(jsonData.id).list;
  if (!jsonData.id) {
    alert('Invalid url');
    submit.removeAttribute('disabled');
    return;
  }

  let playlistData;
  try {
    const response = await fetch(`/api/playlist/${jsonData.id}`);

    console.log(JSON.stringify(response, null, 2));

    playlistData = await response.json();
    // Залогируйте playlistData в консоли, чтобы посмотреть как она выглядит
    if (playlistData.pageInfo.totalResults === 0) {
      alert('No playlist with such id');
      submit.removeAttribute('disabled');
      return;
    }
  } catch (e) {
    submit.removeAttribute('disabled');
    console.error(e);
  }

  jsonData.name = `${playlistData.items[0].snippet.title}: ${playlistData.items[0].snippet.channelTitle}`;

  try {
    // https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch
    const playlistResponse = await fetch('/api/playlist', {
      method: 'POST',
      headers: new Headers(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
      ),
      body: JSON.stringify(jsonData),
    });
    // https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409
    if (playlistResponse.status === 409) {
      const data = await playlistResponse.json();
      throw new Error(data.error)
    }
    const newPlaylist = await playlistResponse.json();
    // Добавляем новый плейлист в общее хранилище
    // TODO remove next line
    // window.context.playlists.push(newPlaylist);
    updatePlaylists(newPlaylist);
    form.reset();
    submit.removeAttribute('disabled');
  } catch (e) {
    submit.removeAttribute('disabled');
    console.error(e);
  }
}
