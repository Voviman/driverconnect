# 📧 Настройка Email для отправки форм

## 🚀 Быстрая настройка с EmailJS (Рекомендуется)

### 1. Создание аккаунта EmailJS
1. Перейдите на [EmailJS.com](https://www.emailjs.com/)
2. Зарегистрируйтесь (бесплатно до 200 писем/месяц)
3. Подтвердите email

### 2. Настройка Email Service
1. В панели EmailJS перейдите в **Email Services**
2. Нажмите **Add New Service**
3. Выберите ваш email провайдер:
   - **Gmail** (рекомендуется)
   - **Outlook**
   - **Yahoo**
   - Или другой SMTP
4. Следуйте инструкциям для подключения

### 3. Создание Email Template
1. Перейдите в **Email Templates**
2. Нажмите **Create New Template**
3. Используйте этот шаблон:

```html
Subject: {{subject}}

Новая заявка на работу - DriverConnect

Информация о кандидате:
- Имя: {{from_name}}
- Email: {{from_email}}
- Телефон: {{phone}}
- Опыт: {{experience_text}}
- Тип CDL: {{cdl_type_text}}
- Язык: {{language}}

Сообщение:
{{message}}

Дата подачи: {{submission_date}}

---
Это автоматическое сообщение от сайта DriverConnect
```

4. Сохраните шаблон и скопируйте **Template ID**

### 4. Получение ключей
1. Перейдите в **Account** → **General**
2. Скопируйте **Public Key**
3. В **Email Services** скопируйте **Service ID**

### 5. Обновление конфигурации
Откройте файл `src/services/emailService.js` и замените:

```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'your_service_id', // Вставьте ваш Service ID
    TEMPLATE_ID: 'your_template_id', // Вставьте ваш Template ID  
    PUBLIC_KEY: 'your_public_key' // Вставьте ваш Public Key
};
```

### 6. Настройка получателей
В шаблоне EmailJS или в коде укажите email адреса получателей:

```javascript
// В emailService.js можно изменить получателей:
to_email: 'careers@driverconnect.com', // Основной email
cc_email: 'hr@driverconnect.com', // Копия для HR
```

## 📋 Альтернативные варианты

### Вариант 2: Netlify Forms
Если используете Netlify для хостинга:

1. Добавьте атрибут `netlify` к форме:
```html
<form netlify name="contact">
```

2. Netlify автоматически обработает форму
3. Уведомления придут на email владельца сайта

### Вариант 3: Собственный Backend
Создайте API endpoint для отправки email:

```javascript
// backend/routes/contact.js
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, experience, cdlType, message } = req.body;
    
    // Отправка email через Nodemailer
    await sendEmail({
        to: ['careers@driverconnect.com', 'hr@driverconnect.com'],
        subject: 'Новая заявка на работу',
        html: `
            <h2>Новая заявка</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Опыт:</strong> ${experience}</p>
            <p><strong>CDL:</strong> ${cdlType}</p>
            <p><strong>Сообщение:</strong> ${message}</p>
        `
    });
    
    res.json({ success: true });
});
```

## 🔧 Тестирование

1. Заполните форму на сайте
2. Проверьте консоль браузера на ошибки
3. Проверьте входящие письма
4. Проверьте папку "Спам"

## 📊 Мониторинг

В панели EmailJS можете отслеживать:
- Количество отправленных писем
- Успешные/неуспешные отправки
- Статистику по времени

## 🛠️ Устранение проблем

### Ошибка "Service ID not found"
- Проверьте правильность Service ID
- Убедитесь, что сервис активен

### Ошибка "Template not found"  
- Проверьте Template ID
- Убедитесь, что шаблон опубликован

### Письма не приходят
- Проверьте папку "Спам"
- Убедитесь в правильности email адресов
- Проверьте лимиты EmailJS

## 💡 Советы

1. **Безопасность**: Public Key можно использовать в frontend
2. **Лимиты**: Бесплатный план - 200 писем/месяц
3. **Резерв**: Настройте несколько email сервисов
4. **Уведомления**: Настройте автоответы для пользователей

## 📞 Поддержка

Если нужна помощь с настройкой:
1. Проверьте документацию EmailJS
2. Обратитесь в поддержку EmailJS
3. Используйте альтернативные варианты

