# node-nodejs-Simple-CRUD-API

Для тестирования приложени необходимо:
1. Скачать проетк
```bash
SSH
git clone git@github.com:KirylZuyeu/node-nodejs-Simple-CRUD-API.git
```
2. Установить зависимости
```bash
npm install
```
3. Создать файл .env с переменной PORT=4000 или переименовать .env.example -> .env
4. Установить PostMan для проверки работоспособности http://localhost:4000/api/users
6. Посмотреть package.json -> scripts (команды запуска приложения)
```bash
npm run start:dev
npm run start:prod
npm run start:multi
npm run test
```
6. В PostMan пробросить запросы - GET POST PUT DELETE по адресу http://localhost:4000/api/users

- POST запроса понадобится обьект в теле запроса
```bash
{
  "username": "UserTest",
  "age": 30,
  "hobbies": ["testing", "coding"]
}
```
- для PUT и DELETE
```bash
{
http://localhost:4000/api/users/{id}}
где id - значение берется из обьекта созданного пользователя
}
```
7. Для запуска тестов нужно
- предварительно запустить проект в одном терминале
```bash
npm run start:dev
```
- после запустить тесты
```bash
{

npm run test

Количество сценариев: 3
Количество тестов: 17

Результат по трем сценариям тестирования в терминале
}
```

**Общая оценка - 222**

#### Если возникнут вопросы по запуску приложения - смело можно писать в


## Tg: @KirylZuyeu
## Discord: KirylZuyeu#1555
