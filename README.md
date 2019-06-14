# YouTube Playlist Discovery

## Описание
Одностраничное приложение, которое позволяет делиться YouTube плейлистами.
Для этого в поле `Playlist URL` вставляем ссылку плейлиста и нажимаем `Add playlst`.
В селекте над полем выбираем один из плейлистов.

## Требования
Для запуска приложения необходимо, чтобы были установлены
[NodeJS](https://nodejs.org/en/), [Docker](https://www.docker.com/) и
[Docker Compose](https://docs.docker.com/compose/).

## Получить Google API ключ
1. Заходим в https://console.developers.google.com
1. Справа от логотипа нажимаем на выпадающий список и создаём новый проект
1. Для **Project name** вводим yt-playlist-discovery
1. Для **Location** оставляем No organization
1. Нажимаем **ENABLE APIS AND SERVICES**
1. Ищем YouTube и выбираем **YouTube Data API v3**, кликнув на него, а затем **Enable**
1. Нажимаем **Create Credentials**
1. Для **Which API are you using?** выбираем YouTube Data API v3
1. Для **Where will you be calling the API from?** выбираем Web Browser ()
1. Для **What data will you be accessing?** выбираем Public data
1. Нажимаем **What credentials do I need?**
1. Копируем созданный API ключ и вставляем его в .env файл

## Настройка и запуск
1. Задать переменные окружения

    Переменные окружения задаются автоматически с помощью пакета
    [dotenv](https://www.npmjs.com/package/dotenv). Нам же необходимо
    создать файл с названием `.env` в папке `app`. В файл запишем
    следующие переменные:
    
    ```bash
    API_KEY=AIz...O0LY
    POSTGRES_DATABASE=postgres
    POSTGRES_PASSWORD=example
    POSTGRES_USER=postgres
    ```
    
    Вместо API_KEY вставьте ключ, которые вы получили, выполняя первый шаг.

1. Установить зависимости

    В терминале, находясь в папке `app`, выполняем команду
    
    ```bash
    npm install
    ```

1. Запустить базу данных

    В терминале, находясь в папке `db`, выполняем команду
    ```bash
    docker-compose up
    ```

1. Применить миграции

    В терминале, находясь в папке `app`, выполняем команду
    ```bash
    npm run migrate
    ```

1. Запустить сервер

    В терминале, находясь в папке `app`, выполняем команду
    ```bash
    npm install
    ```



