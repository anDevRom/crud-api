# CRUD API

## Установка
- Из корня проекта выполните команду:
```console
npm i
```

## Запуск
- Для запуска в режиме **development**, выполните команду:
```console
npm run start:dev
```
- Для запуска в режиме **production**, выполните команду:
```console
npm run start:prod
```
- Для запуска в режиме **multiprocessing**, выполните команду:
```console
npm run start:multi
```

## Использование
### Model
```console
{
  id: uuid,
  name: string,
  age: number,
  hobbies: string[]
}
```
- Получение всех пользователей
```console
GET http://localhost:8080/api/users
```
- Получение одного пользователя
```console
GET http://localhost:8080/api/users/:userId
```
- Создание пользователя (все поля обязательны - `name`, `age`, `hobbies`)
```console
POST http://localhost:8080/api/users
```
- Обновление всех полей пользователя (все поля обязательны - `name`, `age`, `hobbies`)
```console
PUT http://localhost:8080/api/users/:userId
```
- Удаление пользователя
```console
DELETE http://localhost:8080/api/users/:userId
```

## Тестирование
- Для запуска тестов, выполните команду:
```console
npm test
```