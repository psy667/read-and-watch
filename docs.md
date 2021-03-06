### Страницы
- `Index` Главная
- `Profile` Профиль
- `Settings` Настройки

### Сущности
- `record`- Запись 
    - `id` - ID
    - `title` - Заголовок
    - `description` - Описание
    - `type` - Тип
        -  `book` - Книга
        -  `movie` - Фильм
        -  `article` - Статья
        -  `video` - Видео
    - `date` - Дата добавления
    - `status` - Статус
        - `complete` - Выполнен
        - `incomplete` - Не начат
        - `in_progress` - В процессе
    - `tags` - Список тегов
    - `link` - Ссылка
- `tag` - Тег
    - `name` - Имя
    - `id` - ID

- `profile` - Профиль
    - `name` - Имя
    - `email` - Email
    - `records` - Записи
    - `tags` - Теги
    - `date` - Дата регистрации

### Контейнеры и экшены
-  `recordsList` - Список записей
    - Фильтрация по `RECORDS_LIST_FILTER`
        - `title`
        - `status`
        - `type`
        - `tag`
    - Сортировка по `RECORDS_LIST_SORT`
        - `title`
        - `date`
        - `status`
-  `recordCreate` - Добавление новой записи
    - Указание заголовка `RECORD_CREATE_SET_TITLE`
    - Указание описания (не обязательно) `RECORD_CREATE_SET_DESCRIPTION`
    - Указание типа `RECORD_CREATE_SET_TYPE`
    - Указание тегов (не обязательно) `RECORD_CREATE_SET_TAGS`
    - Указание ссылки (не обязательно) `RECORD_CREATE_SET_LINK`
-  `recordEdit` - Редактирование записи
    - Редактирование заголовка `RECORD_EDIT_SET_TITLE`
    - Редактирование описания (не обязательно)  `RECORD_EDIT_SET_DESCRIPTION`
    - Редактирование типа `RECORD_EDIT_SET_TYPE`
    - Редактирование тегов (не обязательно) `RECORD_EDIT_SET_TAGS`
    - Редактирование ссылки (не обязательно) `RECORD_EDIT_SET_LINK`
    `recordRemove` - Удаление записи `RECORD_REMOVE`
-  `tagList` - Список тегов 
    - Удаление тега `TAG_DELETE`
    - Переименование тега `TAG_RENAME`
-  `tagCreate` - Добавление тега
    - Указание имени `TAG_SET_NAME`
-   `profile` - Профиль