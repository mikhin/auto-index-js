# auto-index-js

Утилита для поддержки главного экспортного файла 
БЭМ-блока в актуальном состоянии.

При создании папки элемента или модификатора создастся правильный `.scss`-файл с правильным содержимым,
при этом обновится главный экспортный файл БЭМ-блока — `index.js`.

Удаляет запись об импорте при удалении файла.

Работает для элементов, булевых и «ключ-значение» модификаторов элемента или блока.

## Запуск

`npx @mikhin/auto-index-js`

## Пример необходимой файловой структуры

```
src/app/components
    some-block-folder
        __element-folder <-- при создании папки создастся файл с правильным именем и содержанием, автоматически обновится index.js
            some-block-folder__element-folder.scss
        index.js 
```

Содержание `.scss`-файла:
```
.some-block-folder__element-folder {

}
```

Пример содержания `index.js`:

```
export { default } from './some-block-folder';

require('./__action/some-block-folder__action.scss');
require('./__action/_bool-mod/some-block-folder__action_bool-mod.scss');
require('./__action/_key-mod/_value-mod/some-block-folder__action_key-mod_value-mod.scss');

require('./some-block-folder.scss');

require('./_bool-mod/some-block-folder_bool-mod.scss');
require('./_key-mod/_value-mod/some-block-folder_key-mod_value-mod.scss');
```

## TODO
- Добавить сортировку строк при обновлении `index.js`;
- Добавить кастомизацию для создаваемых файлов.
