const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('OK');
    return;
  }

  if (req.method === 'POST' && req.url === '/json-array') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        // Перевірка: чи є поле numbers, чи це масив і чи всі елементи — числа
        if (!data.numbers || !Array.isArray(data.numbers) || !data.numbers.every(n => typeof n === 'number')) {
          res.statusCode = 422;
          res.end('Unprocessable Entity');
          return;
        }

        const nums = data.numbers;
        const count = nums.length;
        const sum = nums.reduce((a, b) => a + b, 0);
        
        // Розрахунок середнього з урахуванням порожнього масиву
        const average = count > 0 ? sum / count : 0;

        const result = {
          count: count,
          sum: sum,
          average: average
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));

      } catch (e) {
        res.statusCode = 400;
        res.end('Invalid JSON');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});