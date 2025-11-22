# 🔧 Настройка шаблона EmailJS для исправления ошибки "recipients address is empty"

## 🚨 Проблема
Ошибка "recipients address is empty" возникает, когда EmailJS не может найти адрес получателя в шаблоне.

## ✅ Решение

### 1. Настройка Email Service в EmailJS
1. Войдите в панель EmailJS
2. Перейдите в **Email Services**
3. Выберите ваш сервис (Gmail, Outlook и т.д.)
4. В настройках сервиса укажите **ваш email** как отправитель

### 2. Создание правильного шаблона
В **Email Templates** создайте шаблон со следующими настройками:

#### **Settings (Настройки шаблона):**
- **To Email**: `jose@Driverconnect.com` (основной получатель)
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Reply To**: `{{reply_to}}`
- **Subject**: `{{subject}}`

#### **Content (Содержимое письма):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Новая заявка - DriverConnect</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Новая заявка на работу - DriverConnect
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Информация о кандидате:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 150px;">Имя:</td>
                    <td style="padding: 8px 0;">{{from_name}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;">{{from_email}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Телефон:</td>
                    <td style="padding: 8px 0;">{{phone}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Опыт:</td>
                    <td style="padding: 8px 0;">{{experience_text}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Тип CDL:</td>
                    <td style="padding: 8px 0;">{{cdl_type_text}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Язык:</td>
                    <td style="padding: 8px 0;">{{language}}</td>
                </tr>
            </table>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Сообщение:</h3>
            <p style="margin: 0; white-space: pre-wrap;">{{message}}</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; color: #6b7280;">
            <p style="margin: 0;"><strong>Дата подачи:</strong> {{submission_date}}</p>
            <p style="margin: 5px 0 0 0;"><strong>Источник:</strong> Сайт DriverConnect</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
            Это автоматическое сообщение от сайта DriverConnect.<br>
            Для ответа кандидату используйте адрес: {{from_email}}
        </p>
    </div>
</body>
</html>
```

### 3. Отправка на несколько адресов

#### **Вариант A: Через CC/BCC в шаблоне**
В настройках шаблона добавьте:
- **CC**: `sam@cdl4hire.com`
- **BCC**: `admin@driverconnect.com` (если нужен скрытый получатель)

#### **Вариант B: Создать несколько шаблонов**
1. Создайте шаблон для `jose@Driverconnect.com` (Template ID: `template_l2jcwnb`)
2. Создайте второй шаблон для `sam@cdl4hire.com` (Template ID: `template_sam`)
3. Обновите код для отправки на оба шаблона

### 4. Обновление кода (если используете несколько шаблонов)

```javascript
// В emailService.js
const TEMPLATES = {
    JOSE: 'template_l2jcwnb',
    SAM: 'template_sam'
};

const EMAIL_RECIPIENTS = [
    { email: 'jose@Driverconnect.com', template: TEMPLATES.JOSE },
    { email: 'sam@cdl4hire.com', template: TEMPLATES.SAM }
];
```

## 🔍 Отладка

### Проверка в консоли EmailJS:
1. Войдите в панель EmailJS
2. Перейдите в **Logs**
3. Посмотрите статус отправленных писем

### Частые ошибки:
- **"Service not found"** - неправильный Service ID
- **"Template not found"** - неправильный Template ID  
- **"Recipients address is empty"** - не указан получатель в шаблоне
- **"Invalid public key"** - неправильный Public Key

### Решение проблем:
1. Убедитесь, что в настройках шаблона указан **To Email**
2. Проверьте, что сервис активен и настроен
3. Убедитесь, что все ID и ключи правильные
4. Проверьте лимиты EmailJS (200 писем/месяц на бесплатном плане)

## 📞 Если ничего не помогает:
1. Используйте простой шаблон без HTML
2. Отправляйте только на один адрес для тестирования
3. Проверьте документацию EmailJS
4. Обратитесь в поддержку EmailJS
