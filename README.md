# Practice 5 - Node.js JSON HTTP Servers

Набір HTTP-серверів для обробки JSON-запитів. Платформа: **eu-node-basics-workshop**.

## Запуск

Кожен файл запускається окремо:

```bash
node <файл> [порт]
```

Порт за замовчуванням: `3000`.

## Завдання

| # | Файл | Ендпоінт | Опис |
|---|------|----------|------|
| 1 | `json_echo.js` | `POST /json-echo` | Повертає отриманий JSON без змін |
| 2 | `json_object.js` | `POST /json-object` | Приймає `{name, age}`, повертає `{greeting, isAdult}` |
| 3 | `json_array.js` | `POST /json-array` | Приймає `{numbers}`, повертає `{count, sum, average}` |
| 4 | `json.calc.js` | `POST /json-calc` | Приймає `{a, b, operation}`, повертає `{result}` |
| 5 | `json_nested.js` | `POST /json-nested` | Приймає `{user: {name, roles}}`, повертає `{name, roleCount, isAdmin}` |

## Приклади

```bash
# JSON Echo
curl -X POST http://localhost:3000/json-echo -H "Content-Type: application/json" -d '{"message":"Hello"}'

# JSON Object
curl -X POST http://localhost:3000/json-object -H "Content-Type: application/json" -d '{"name":"Anna","age":20}'

# JSON Array
curl -X POST http://localhost:3000/json-array -H "Content-Type: application/json" -d '{"numbers":[1,2,3]}'

# JSON Calc
curl -X POST http://localhost:3000/json-calc -H "Content-Type: application/json" -d '{"a":10,"b":3,"operation":"add"}'

# JSON Nested
curl -X POST http://localhost:3000/json-nested -H "Content-Type: application/json" -d '{"user":{"name":"Admin","roles":["admin","user"]}}'
```

## Перевірка через воркшоп

```bash
npx eu-node-basics-workshop verify <номер> <файл>
```
