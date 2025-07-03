# Jekyll PWA Blog

Это статический блог на Jekyll, преобразованный из мобильного PWA приложения, с сохранением уникального мобильного дизайна и UI.

## Структура проекта

```
. # Корневая директория проекта
├── _config.yml # Конфигурация сайта Jekyll
├── _layouts/ # Шаблоны страниц
│   ├── default.html # Основной шаблон
│   ├── home.html # Шаблон главной страницы
│   └── post.html # Шаблон страницы поста
├── _includes/ # Переиспользуемые компоненты
│   ├── modal-style-content.html # Модальные окна (Contact, Shop)
│   └── profile-card.html # Карточка профиля
├── _posts/ # Директория для постов блога (Markdown файлы)
│   ├── 2023-05-12-the-power-of-mindset.md
│   ├── 2023-06-05-essential-skills-for-2023.md
│   └── 2023-07-18-top-productivity-tools.md
├── _shop_items/ # Директория для товаров магазина (Markdown файлы)
│   ├── mindset-mastery-course.md
│   ├── productivity-toolkit.md
│   └── skill-development-kit.md
├── assets/ # Статические ресурсы (CSS, JS, изображения, иконки)
│   ├── css/
│   │   └── style.css # Все кастомные CSS стили
│   ├── js/
│   │   └── main.js # Основной JavaScript
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── manifest.json # Манифест PWA
├── sw.js # Service Worker для PWA
├── robots.txt # Файл для поисковых роботов
└── index.html # Главная страница сайта
```

## Развертывание на GitHub Pages

1.  **Клонируйте репозиторий:**
    Если вы еще не сделали этого, клонируйте ваш репозиторий GitHub Pages.

    ```bash
    git clone https://github.com/ВАШ_ПОЛЬЗОВАТЕЛЬ/ВАШ_РЕПОЗИТОРИЙ.github.io.git
    cd ВАШ_РЕПОЗИТОРИЙ.github.io
    ```

2.  **Установите Jekyll:**
    Убедитесь, что у вас установлен Ruby и Bundler. Затем установите Jekyll и необходимые гемы:

    ```bash
    gem install jekyll bundler
    bundle install
    ```

3.  **Запустите локально (для тестирования):**
    Вы можете запустить Jekyll локально, чтобы увидеть изменения перед деплоем:

    ```bash
    bundle exec jekyll serve
    ```
    Ваш сайт будет доступен по адресу `http://localhost:4000` (или другому порту, указанному в консоли).

4.  **Настройка `_config.yml`:**
    Убедитесь, что `baseurl` и `url` в `_config.yml` настроены правильно для вашего репозитория GitHub Pages. Например, если ваш репозиторий называется `my-blog`, то `baseurl` должен быть `/my-blog`.

    ```yaml
    baseurl: "/thyshop.github.io" # Для репозитория thyshop.github.io
    url: "https://thyshop.github.io" # Ваш домен GitHub Pages
    ```

5.  **Добавление новых статей:**
    Для добавления новой статьи создайте новый Markdown файл в директории `_posts/` со следующим форматом имени файла: `YYYY-MM-DD-название-статьи.md`.

    Пример:

    ```markdown
    --- 
    layout: post
    title: "Название новой статьи"
    date: YYYY-MM-DD
    categories: [Категория1, Категория2]
    tags: [тег1, тег2]
    author: "Ваше Имя"
    image: "/assets/images/image-for-post.jpg" # Путь к изображению поста
    read_time: "X min read"
    description: "Краткое описание статьи."
    ---

    Ваш контент статьи в Markdown.
    ```

6.  **Добавление новых товаров (Shop Items):**
    Для добавления нового товара создайте новый Markdown файл в директории `_shop_items/` со следующим форматом имени файла: `название-товара.md`.

    Пример:

    ```markdown
    ---
    id: "unique-product-id"
    title: "Название товара"
    description: "Подробное описание товара."
    category: "Категория"
    price: "$XX"
    original_price: "$YY" # Опционально
    image: "/assets/images/image-for-product.jpg" # Путь к изображению товара
    stripe_link: "https://link-to-stripe-checkout.com" # Ссылка для покупки
    ---
    ```

7.  **Пуш на GitHub:**
    После того как вы добавили или изменили файлы, закоммитьте и запушьте их в ваш репозиторий GitHub Pages:

    ```bash
    git add .
    git commit -m "Add new Jekyll blog content"
    git push origin main
    ```

    GitHub Pages автоматически соберет ваш сайт. Это может занять несколько минут. Вы сможете увидеть свой сайт по адресу `https://ВАШ_ПОЛЬЗОВАТЕЛЬ.github.io/ВАШ_РЕПОЗИТОРИЙ/`.

## Важные замечания

*   **PWA Функциональность:** `manifest.json` и `sw.js` включены для сохранения PWA функциональности. Убедитесь, что пути в `sw.js` соответствуют вашему `baseurl`.
*   **SEO:** Плагины `jekyll-seo-tag` и `jekyll-sitemap` включены в `_config.yml` для автоматической генерации мета-тегов и `sitemap.xml`.
*   **Изображения:** Рекомендуется размещать изображения в `assets/images/` и использовать `relative_url` для корректных путей.
*   **Tailwind CSS:** Tailwind CSS загружается через CDN, что упрощает настройку, но для продакшена рекомендуется использовать локальную сборку.
*   **JavaScript:** JavaScript адаптирован для работы со статическими данными Jekyll. Динамическая загрузка постов и товаров заменена на итерацию по коллекциям Jekyll.

Надеюсь, это поможет вам запустить ваш Jekyll блог!

