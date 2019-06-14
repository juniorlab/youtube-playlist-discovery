// Справочник https://developers.google.com/youtube/iframe_api_reference
let player;

// Как только скрипт для player API загрузится, автоматически вызовется эта функция
window.onYouTubeIframeAPIReady = () => {
  // Первым аргументом передаём id элемента
  player = new YT.Player('player', {
    height: 800 / 1.77,
    width: 800,
    events: {
      // Указываем какую функцию вызвать, когда плеер будет готов
      'onReady': window.onPlayerReady,
    },
  });
};

function initialPlaylistLoading() {
  // Если уже создали храилище
  if (window.context && window.context.playlists) {
    // и там есть по крайней мере один плейлист
    if (window.context.playlists.length > 0) {
      // то загружаем его
      player.loadPlaylist({
        list: window.context.playlists[0].id,
        suggestedQuality: 'default',
      });
    }
  } else {
    setTimeout(initialPlaylistLoading, 500);
  }
}

window.onPlayerReady = () => {
  initialPlaylistLoading()
};

// Мы будем автоматически менять размер плеера, когда меняется размер окна

let currentlyResizing = 0;

window.addEventListener('resize', () => {
  const width = window.innerWidth;

  // Ширина плеера 800 пикселей. Поэтому, если окно шире 800 пикселей,
  // значит плеер влезает и нам ничего не надо делать
  if (width > 800) {
    return;
  }

  // Установим ширина и высоту плеера в зависимости от текущей ширины окна
  player.setSize(width, width / 1.77);

  // Так как ширина окна может обновляется очень быстро
  // и браузер может не успевать обработать события (resize),
  // размер плеера может обновляться не до конца
  // Попробуйте закоментировать setTimeout и вы увидете
  // проблему

  currentlyResizing += 1;

  setTimeout(() => {
    currentlyResizing -= 1;
    // Подождём, пока снова не вернёмся к нулю
    if (currentlyResizing === 0) {
      // и устанавливаем верный размер плеера
      const width = window.innerWidth > 800 ? 800 : window.innerWidth;
      player.setSize(width, width / 1.77);
    }
  }, 500);
});

// Добавить YouTube Iframe API в head
const script = document.createElement('script');
script.src = 'https://www.youtube.com/iframe_api';
script.setAttribute('defer', 'defer');

document.head.appendChild(script);

export {player};
