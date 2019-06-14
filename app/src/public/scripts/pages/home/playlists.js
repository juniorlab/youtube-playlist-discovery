import {player} from './player';

/**
 *
 * @param playlist - объект с данными о плейлисте, которые мы получаем с помощью YouTube API
 */
export function updatePlaylists(playlist) {
  // Сохраняем его в наше глобальное хранилище
  window.context.playlists.push(playlist);

  // Добавляем его в select
  const select = document.getElementById('Playlists');

  // https://www.w3schools.com/jsref/met_select_add.asp
  const newOption = document.createElement('option');
  newOption.value = playlist.id;
  newOption.text = playlist.name;
  select.add(newOption);
}

window.addEventListener('load', () => {
  // Как только меняется опция в селекте, загрузить выбранный плейлист
  document.getElementById('Playlists').addEventListener('change', (e) => {
    // https://developers.google.com/youtube/iframe_api_reference#Queueing_Functions
    player.loadPlaylist({
      list: e.target.value,
      suggestedQuality: 'default',
    })
  });
});

async function bootstrap() {
  try {
    // Создать глобальное хранилище
    window.context = {playlists: []};
    // Получить список плэйлистов с сервера
    const response = await fetch('/api/playlist');
    // Сохранить их в хранилище
    window.context.playlists = await response.json();
  } catch (e) {
    console.error(e)
  }
}

// По загрузке скрипта сразу выполни эту функцию
bootstrap();
