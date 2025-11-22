# 🚀 Руководство по деплою DriverConnect

## ✅ Перед деплоем

### 1. Проверьте чеклист

- [ ] Заменены все placeholder данные (телефон, URL, соцсети)
- [ ] Созданы все размеры favicon
- [ ] Оптимизированы все изображения
- [ ] Настроен .env файл с API ключами
- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] Lighthouse Score > 90

### 2. Обновите данные

#### В `public/index.html` (строка ~62):
```json
"telephone": "+1-XXX-XXX-XXXX",  // 👈 Замените
```

#### В `src/components/StructuredData.js` (строка 11):
```javascript
"telephone": "+1-XXX-XXX-XXXX",  // 👈 Замените
```

#### URL домена (если не driverconnect.com):
Замените во всех файлах:
- `public/index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/components/StructuredData.js`

### 3. Соберите проект

```bash
npm run build
```

Это создаст папку `build/` с оптимизированными файлами.

---

## 🌐 Варианты деплоя

### Вариант 1: Vercel (Рекомендуется) ⭐

**Преимущества:**
- ✅ Бесплатный SSL
- ✅ Автоматический деплой из Git
- ✅ CDN по всему миру
- ✅ Простая настройка

**Шаги:**

1. Зарегистрируйтесь на https://vercel.com
2. Подключите GitHub репозиторий
3. Настройте проект:
   ```
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   ```
4. Добавьте environment variables (.env)
5. Deploy!

**Конфигурация (vercel.json):**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### Вариант 2: Netlify

**Преимущества:**
- ✅ Бесплатный SSL
- ✅ Автоматический деплой
- ✅ Drag & drop деплой
- ✅ Forms handling

**Шаги:**

1. Зарегистрируйтесь на https://netlify.com
2. Подключите GitHub или загрузите папку `build/`
3. Настройте:
   ```
   Build command: npm run build
   Publish directory: build
   ```
4. Добавьте environment variables
5. Deploy!

**Конфигурация (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Вариант 3: GitHub Pages

**Преимущества:**
- ✅ Бесплатный хостинг
- ✅ Интеграция с GitHub
- ✅ Простой деплой

**Шаги:**

1. Установите gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Обновите `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/driverconnect",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Деплой:
```bash
npm run deploy
```

---

### Вариант 4: Собственный сервер (VPS)

#### Apache

1. Соберите проект:
```bash
npm run build
```

2. Загрузите папку `build/` на сервер:
```bash
scp -r build/* user@server:/var/www/driverconnect/
```

3. Настройте Apache:
```apache
<VirtualHost *:80>
    ServerName driverconnect.com
    ServerAlias www.driverconnect.com
    DocumentRoot /var/www/driverconnect
    
    <Directory /var/www/driverconnect>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Redirect to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName driverconnect.com
    ServerAlias www.driverconnect.com
    DocumentRoot /var/www/driverconnect
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    <Directory /var/www/driverconnect>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

4. Перезапустите Apache:
```bash
sudo systemctl restart apache2
```

#### Nginx

1. Соберите проект:
```bash
npm run build
```

2. Загрузите на сервер:
```bash
scp -r build/* user@server:/var/www/driverconnect/
```

3. Используйте `nginx.conf.example` из проекта:
```bash
sudo cp nginx.conf.example /etc/nginx/sites-available/driverconnect
sudo ln -s /etc/nginx/sites-available/driverconnect /etc/nginx/sites-enabled/
```

4. Обновите пути в конфиге:
```nginx
root /var/www/driverconnect;
ssl_certificate /path/to/certificate.crt;
ssl_certificate_key /path/to/private.key;
```

5. Проверьте конфигурацию:
```bash
sudo nginx -t
```

6. Перезапустите Nginx:
```bash
sudo systemctl restart nginx
```

---

## 🔒 SSL сертификат (HTTPS)

### Let's Encrypt (Бесплатно)

#### Для Apache:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d driverconnect.com -d www.driverconnect.com
```

#### Для Nginx:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d driverconnect.com -d www.driverconnect.com
```

#### Автоматическое обновление:
```bash
sudo certbot renew --dry-run
```

---

## 🔧 После деплоя

### 1. Проверьте сайт

- [ ] Сайт открывается по HTTPS
- [ ] Все страницы работают
- [ ] Формы отправляются
- [ ] Изображения загружаются
- [ ] Видео проигрываются

### 2. Проверьте SEO файлы

- [ ] https://driverconnect.com/robots.txt
- [ ] https://driverconnect.com/sitemap.xml
- [ ] https://driverconnect.com/manifest.json

### 3. Запустите тесты

#### Lighthouse (Chrome DevTools):
```
F12 → Lighthouse → Generate report
Цель: Score > 90 по всем метрикам
```

#### PageSpeed Insights:
```
https://pagespeed.web.dev/
Введите URL сайта
```

#### Mobile-Friendly Test:
```
https://search.google.com/test/mobile-friendly
```

#### Rich Results Test:
```
https://search.google.com/test/rich-results
```

---

## 📊 Google Services

### 1. Google Search Console

1. Перейдите: https://search.google.com/search-console
2. Добавьте ресурс: `https://driverconnect.com`
3. Подтвердите владение:
   - HTML файл
   - DNS запись
   - Google Analytics
   - Google Tag Manager

4. Отправьте sitemap:
   ```
   https://driverconnect.com/sitemap.xml
   ```

### 2. Google Analytics

1. Создайте аккаунт: https://analytics.google.com
2. Получите Measurement ID: `G-XXXXXXXXXX`
3. Добавьте в `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Пересоберите и задеплойте:
```bash
npm run build
```

### 3. Google My Business

1. Создайте профиль: https://www.google.com/business/
2. Заполните информацию:
   - Название: DriverConnect
   - Категория: Employment Agency
   - Адрес (если есть)
   - Телефон
   - Сайт
   - Часы работы
3. Загрузите фото
4. Подтвердите владение

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        CI: false
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
        working-directory: ./
```

---

## 📈 Мониторинг

### Uptime мониторинг

**UptimeRobot** (бесплатно):
- https://uptimerobot.com
- Проверка доступности каждые 5 минут
- Email уведомления

**Pingdom**:
- https://www.pingdom.com
- Детальная аналитика
- Мониторинг производительности

### Error tracking

**Sentry** (рекомендуется):
```bash
npm install @sentry/react
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🔐 Безопасность

### Environment Variables

**Никогда не коммитьте:**
- API ключи
- Секретные токены
- Пароли

**Используйте .env:**
```bash
# .env (не коммитить!)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

**Добавьте в .gitignore:**
```
.env
.env.local
.env.production
```

---

## 📝 Чеклист деплоя

### Pre-deployment
- [ ] Все тесты проходят
- [ ] Проект собирается без ошибок
- [ ] Lighthouse Score > 90
- [ ] Заменены placeholder данные
- [ ] Настроены environment variables
- [ ] Созданы favicon
- [ ] Оптимизированы изображения

### Deployment
- [ ] Выбрана платформа хостинга
- [ ] Настроен SSL (HTTPS)
- [ ] Настроен домен
- [ ] Загружены файлы
- [ ] Проверена работоспособность

### Post-deployment
- [ ] Google Search Console настроен
- [ ] Google Analytics настроен
- [ ] Google My Business создан
- [ ] Sitemap отправлен
- [ ] SEO тесты пройдены
- [ ] Uptime мониторинг настроен

---

## 🆘 Решение проблем

### Сайт не открывается
1. Проверьте DNS записи
2. Проверьте SSL сертификат
3. Проверьте логи сервера
4. Проверьте firewall

### 404 ошибки на роутах
1. Убедитесь, что .htaccess работает (Apache)
2. Проверьте nginx конфигурацию (Nginx)
3. Добавьте redirects в Netlify/Vercel

### Медленная загрузка
1. Оптимизируйте изображения
2. Включите Gzip сжатие
3. Используйте CDN
4. Проверьте PageSpeed Insights

---

## 📞 Поддержка

### Документация
- [SEO_QUICK_START.md](./SEO_QUICK_START.md)
- [SEO_README.md](./SEO_README.md)
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### Платформы
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com

---

**Удачи с деплоем! 🚀**

**Дата**: 22 ноября 2025  
**Версия**: 1.0.0

