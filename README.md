### Описание:
***Реализовать визуализацию прямого геокодирования. Для реализации проекта использовалась библиотека <a href="https://maplibre.org/maplibre-gl-js/docs/" target="_blank">`maplibre-gl`</a>.***
___

### Функционал (frontend):
- ***Ввод*** данных (место, организация) в поисковую строку:
- ***Отложенный запрос*** поиска данных:
- ***Реализация*** дропдауна с вариантами поиска:
- ***Отрисовка*** точки на карте:
- ***Полет*** до указанного места:

### Стек технологий
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)


- ```react-map-gl``` - https://visgl.github.io/react-map-gl/
- ```API Геокодера``` - https://yandex.ru/maps-api/products/geocoder-api
- ```API Поиска по организациям``` - https://yandex.ru/maps-api/products/geosearch-api
- ```API Maptiler``` https://cloud.maptiler.com/account/keys/

----

gh-pages (deploy): https://markelov97vad.github.io/geosemantica-test/

----

### Установка и запуск проекта:

1. `git clone` https://github.com/Markelov97Vad/geosemantica-test.git - клонировать репозиторий на свое устройство (HTTPS)
2. `npm i` - установить зависимости
3. Добавить `.env` файл с ключами:
    - `API_KEY_PLACE=<ключ API Геокодера>` 
    - `API_KEY_ORG=<ключ API Поиска по организациям>`
    - `API_KEY_MAP=<ключ API Maptiler>`
4. `npm run start` - запустить приложение
5. `npm run build:dev` - сборка проекта в режиме разработки
6. `npm run build:prod` - сборка production версии
