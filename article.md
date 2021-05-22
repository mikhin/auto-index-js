# Файловая структура БЭМа, которая делает больно, или пишем утилиту, избавляющую от рутинных задач

Привет! Меня зовут Юрий Михин и я работаю разработчиком интерфейсов в Funbox, где мы создаем цифровые продукты для мобильных операторов и их клиентов.

## Предпосылки боли

При разработке интерфейсов в веб-приложениях в нашей команде мы придерживаемся методологии БЭМ, одним из основных принципов которой является разделение интерфейса на компоненты (блоки).

В файловой системе каждый блок — это отдельная директория, где хранятся ресурсы блока и его реализации в различных технологиях (HTML, CSS, JS, React, Pug, SASS, whatever).

Интерфейс состоит из блоков, а блоки состоят из элементов и модификаторов (и модификаторов элементов), поэтому для каждой сущности также существует своя отдельная директория в рамках директории блока.

В целом для каждого блока получается примерно такая структура файлов в директории:

```
components
	promo-banner
		__action
			promo-banner__action.scss
			_type
				_primary
					promo-banner__action_type_primary.scss
		__description
			promo-banner__description.scss
		__title
			promo-banner__title.scss
		_type
			_disabled
				promo-banner_type_disabled.scss			
		promo-banner.jsx
		promo-banner.scss
		index.js
```

Может показаться, что такая организация избыточно сложная, но она себя оправдывает если БЭМ-блок становится хоть сколько-то сложным: при большом количестве элементов и модификаторов сразу появляется много стилей, вёрстка становится сложной. Ориентироваться в нескольких, но маленьких файлах гораздо проще чем, например, в одном большом файле.

Точка входа в компонент — файл index.js. Тут импортируются стили (чтобы не импортировать их в jsx-файлах) и ре-эскпортируются файлы разметки.

Для вышеупомянутого блока promo-banner выше файл index.js выглядит так:

```
// index.js
export { default } from ‘./promo-banner.jsx’;

require(‘./__action/promo-banner__action.scss’);
require(‘./__action/_type/_primary/promo-banner__action_type_primary.scss’);
require(‘./__description/promo-banner__description.scss’);
require(‘./__title/promo-banner__title.scss’);

require(‘./promo-banner.scss’);

require(‘./_type/_disabled/promo-banner_type_disabled.scss’);
```

Порядок импортов стилей важен — например, файлы модификаторов должны импортироваться позднее, чем основной файл, чтобы в итоговом бандле стили модификатора встали ниже, чтобы каскад в CSS сработал правильно.

## Боль

Несложно догадаться, что создавать большое количество однотипных файлов с однотипным содержимым каждый раз руками — очень больно.

## Решение

Я решил написать небольшую утилиту, которая бы в автоматическом режиме следила за изменениями в директориях блоков и сама бы создавала нужные файлы с нужным контентом и обновляла бы корневой index.js.

Работала бы она так — я только создаю нужную директорию для БЭМ-элемента или БЭМ-модификатора, а программа сама создавала бы внутри файл с нужным именем, и добавляла бы запись об импорте этого файла в корневой index.js.

Пример: создаю внутри директории блока promo-banner директорию для элемента __warning — утилита за меня создает внутри новой директории файл promo-banner__warning.scss и кладет в него нужный контент (например “.promo-banner__warning {  }”), а также добавляет запись “require(‘./__warning/promo-banner__warning.scss’);” в корневой index.js блока.

## Пишем программу

Создадим главный файл cli.js, который будет запускать программу:

```javascript
//cli.js

// Делаем файл исполняемым для Unix-систем
#!/usr/bin/env node

// Используем commander для написания «обертки» для нашего основного скрипта
const program = require(‘commander');

// Подключаем основной скрипт
const autoIndex = require(‘./src');

program
// Укажем версию и описание проекта из корневого package.json
.version(require('./package.json').version, '-V, --version')
.description(require(‘./package.json').description)
.action(() => {
// Запускаем основной скрипт
autoIndex();
})
.parse(process.argv);
```

Опишем константы проекта.

```javascript
// src/constants.js

const path = require('path');

module.exports = {
// Будем считать, что скрипт должен работать с БЭМ-блоками в одной папке, где лежат все блоки — src/app/components
// Используем path.join для создания файлового пути совместимого с Unix и Windows
COMPONENTS_FOLDER_PATH: path.join('src', 'app', ‘components'),
// Пока что нас интересует только файлы стилей с расширением .scss
STYLE_FILE_EXTENSION: ‘.scss',
// Символ-разделитель для элементов по БЭМ
ELEMENT_SEPARATOR: ‘__',
// Символ-разделитель для модификаторов по БЭМ
MOD_SEPARATOR: '_',
};
```

Опишем точку входа нашего скрипта.

```javascript
// src/index.js

// Будем использовать chokidar для отслеживания событий в файловой системе в реальном времени
const chokidar = require('chokidar');
const { COMPONENTS_FOLDER_PATH } = require(‘./constants');

// Создадим две функции-обработчики требуемых нам событий: создание и удаление директории
const addDirectoryHandler = require('./handlers/add-directory-handler');
const deleteDirectoryHandler = require('./handlers/delete-directory-handler');

// Укажем для chokidar директорию для отслеживания изменений
const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH);

// Создадим обработчик onReady для события “ready” в chokidar. Добавим наши функции-обработчики для событий создания и удаления директорий
function onReady() {
watcher.on('ready', () => watcher
  .on('addDir', addDirectoryHandler)
  .on('unlinkDir', deleteDirectoryHandler)
);

  console.log('Watching is active');
}

module.exports = onReady;
```

Хелперы

Нам понадобится несколько функций хелперов. Опишем их:
Хелперы для БЭМ
1. Функция для получения имени БЭМ-блока из файлового пути для только что созданной директории

// src/bem/get-block-name.js

const path = require('path');

const fileSystemPathSeparator = require('../file-system-path-separator');
const { COMPONENTS_FOLDER_PATH } = require('./../constants');

function getBlockName(filePath) {
// Выражение для поиска имен директорий потомков БЭМ-блока
const bemBlockChildrenNameRegExp = new RegExp(`${fileSystemPathSeparator}.{1,}`, 'g');


// Берем файловый путь для только что созданного файла, и …
return filePath
// Отсекаем имя директории с компонентами
.replace(COMPONENTS_FOLDER_PATH, ‘')
// Отсекаем файловый разделитель
.replace(path.sep, ‘')
// Отсекаем имена потомков
.replace(bemBlockChildrenNameRegExp, '');
}

module.exports = getBlockName;
2. Функция для указания — создана ли директория для БЭМ-элемента

// src/bem/is-element.js

const { ELEMENT_SEPARATOR } = require('./../constants');

function isElement(name) {
return name.match(ELEMENT_SEPARATOR);
}

module.exports = isElement;

2. Функция для указания — создана ли директория для БЭМ-модификатора

const { ELEMENT_SEPARATOR, MOD_SEPARATOR } = require('./../constants');

function isMod(name) {
// Проверяем включает ли путь символ-разделитель для модификатора и обязательно проверяем не включает ли символ-разделитель для элемента, т.к. символ модификатора входит в символы элемента
return name.match(MOD_SEPARATOR) && !name.match(ELEMENT_SEPARATOR);
}

module.exports = isMod;






Функция-обработчик для события создания директории

// src/handlers/add-directory-handler.js

const os = require('os');
const fs = require('fs');
const path = require('path');

const fileSystemPathSeparator = require('../file-system-path-separator');
const updateIndexFile = require('../index-file/update-index-file');
const createFile = require('../create-file');
const isElement = require('../bem/is-element');
const isMod = require('../bem/is-mod');
const { COMPONENTS_FOLDER_PATH, STYLE_FILE_EXTENSION } = require('../constants');

const { EOL } = os;

function getPreparedStyleFileContent(selector) {
return `.${selector} {${EOL}  ${EOL}}`;
}

function addDirectoryHandler(createdFolderPath) {
// Производим операции только в случае если созданная директория подходит под наши правила соответствия БЭМ-элементу или БЭМ-модификатору
if (isElement(createdFolderPath) || isMod(createdFolderPath)) {
const fileSepRegExp = new RegExp(`${fileSystemPathSeparator}`, 'g');

// В пути созданной директории отсекаем имя директории с компонентами, убираем один файловый разделитель и вуа-ля получаем CSS-селектор, который позже поместим внутрь файла стилей .scss
const selector = createdFolderPath
.replace(COMPONENTS_FOLDER_PATH, '')
.replace(fileSepRegExp, '');

// В пути созданной директории отсекаем имя директории с компонентами, убираем один файловый разделитель и вуа-ля получаем CSS-селектор, который позже поместим внутрь файла стилей .scss
const creatingFilePath = path.join(createdFolderPath, `${selector}${STYLE_FILE_EXTENSION}`);
const creatingFileContent = getPreparedStyleFileContent(selector);

    if (!fs.existsSync(creatingFilePath)) {
      createFile(creatingFilePath, creatingFileContent);
      updateIndexFile(createdFolderPath, creatingFilePath);
    }
}
}

module.exports = addDirectoryHandler;



