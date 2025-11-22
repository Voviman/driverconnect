# Руководство по настройке интеграций

Этот документ содержит инструкции по настройке интеграций с Telegram Bot API и Google Sheets API для формы контактов DriverConnect.

## 🚀 Обзор

После заполнения формы данные будут отправлены в:
1. **Email** (через EmailJS) - существующая функциональность
2. **Telegram группу** (через Telegram Bot API) - новая функциональность
3. **Google Sheets** (через Google Sheets API) - новая функциональность

## 📋 Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

```env
# EmailJS Configuration (уже настроено)
REACT_APP_EMAILJS_SERVICE_ID=service_lebubvi
REACT_APP_EMAILJS_TEMPLATE_ID=template_l2jcwnb
REACT_APP_EMAILJS_PUBLIC_KEY=yUbQP4K87uPcCM6d4

# Email Recipients
REACT_APP_EMAIL_RECIPIENTS=jose@Driverconnect.com,sam@cdl4hire.com

# Telegram Bot Configuration (ТРЕБУЕТ НАСТРОЙКИ)
REACT_APP_TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
REACT_APP_TELEGRAM_CHAT_ID=your_telegram_chat_id_here

# Google Sheets Configuration (ТРЕБУЕТ НАСТРОЙКИ)
REACT_APP_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key_here
```

## 🤖 Настройка Telegram Bot

### Шаг 1: Создание бота
1. Откройте Telegram и найдите @BotFather
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Получите **Bot Token** и добавьте его в `.env` как `REACT_APP_TELEGRAM_BOT_TOKEN`

### Шаг 2: Настройка группы
1. Создайте группу в Telegram или используйте существующую
2. Добавьте вашего бота в группу как администратора
3. Получите **Chat ID** группы:
   - Отправьте сообщение в группу
   - Перейдите по ссылке: `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
   - Найдите `chat.id` в ответе
   - Добавьте его в `.env` как `REACT_APP_TELEGRAM_CHAT_ID`

### Пример сообщения в Telegram:
```
🚛 New Job Application - DriverConnect

👤 Name: John Doe
📧 Email: john@example.com
📞 Phone: +1234567890
🎯 Experience: 2-5 Years
🆔 CDL Type: Class A
💬 Message: Looking for long-haul opportunities

📅 Submitted: October 27, 2025, 10:30 AM
```

## 📊 Настройка Google Sheets

### Шаг 1: Включение Google Sheets API
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google Sheets API
4. Создайте API ключ:
   - Перейдите в "Credentials" → "Create Credentials" → "API Key"
   - Ограничьте ключ для Google Sheets API
   - Добавьте ключ в `.env` как `REACT_APP_GOOGLE_SHEETS_API_KEY`

### Шаг 2: Настройка доступа к таблице
1. Откройте вашу Google Sheets таблицу: https://docs.google.com/spreadsheets/d/1vzqLJjfVaU1DLYlBmY4iaS515dv7EOY3c7C5ptMBui0/edit
2. Нажмите "Share" → "Change to anyone with the link"
3. Установите права доступа "Viewer" или "Editor"

### Структура таблицы:
Таблица будет автоматически заполняться со следующими колонками:
- **A**: Date/Time (Дата/Время)
- **B**: Name (Имя)
- **C**: Email (Email)
- **D**: Phone (Телефон)
- **E**: Experience (Опыт)
- **F**: CDL Type (Тип CDL)
- **G**: Message (Сообщение)
- **H**: Language (Язык)

## 🔧 Тестирование интеграций

После настройки переменных окружения:

1. Перезапустите приложение: `npm start`
2. Заполните форму на сайте
3. Проверьте:
   - Email в почте
   - Сообщение в Telegram группе
   - Новую строку в Google Sheets

## 🛠 Функции для тестирования

В коде добавлены функции для тестирования подключений:

```javascript
import { testTelegramConnection } from './services/telegramService';
import { testGoogleSheetsConnection } from './services/googleSheetsService';

// Тестирование Telegram
const telegramTest = await testTelegramConnection();
console.log('Telegram test:', telegramTest);

// Тестирование Google Sheets
const sheetsTest = await testGoogleSheetsConnection();
console.log('Google Sheets test:', sheetsTest);
```

## 🚨 Устранение неполадок

### Telegram не работает:
- Проверьте правильность Bot Token
- Убедитесь, что бот добавлен в группу как администратор
- Проверьте правильность Chat ID (должен начинаться с `-` для групп)

### Google Sheets не работает:
- Проверьте правильность API ключа
- Убедитесь, что Google Sheets API включен в проекте
- Проверьте права доступа к таблице
- Убедитесь, что ID таблицы правильный

### Частичный успех:
Если одна из интеграций не работает, форма все равно будет отправлена через работающие сервисы. Пользователь получит уведомление о частичном успехе.

## 📝 Безопасность

- Никогда не коммитьте файл `.env` в репозиторий
- Используйте ограниченные API ключи
- Регулярно ротируйте токены и ключи
- Ограничьте доступ к Telegram боту и Google Sheets

## 🔄 Обновления

Все интеграции работают параллельно для лучшей производительности. Если одна из интеграций не удалась, остальные продолжат работать.

Логи всех операций записываются в консоль браузера для отладки.

