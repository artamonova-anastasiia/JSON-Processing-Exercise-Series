const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('OK');
    return;
  }

  if (req.method === 'POST' && req.url === '/json-calc') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { a, b, operation } = data;


        if (a === undefined || b === undefined || !operation) {
          res.statusCode = 422;
          res.end('Missing fields');
          return;
        }

        let result;

        switch (operation) {
          case 'add':
            result = a + b;
            break;
          case 'subtract':
            result = a - b;
            break;
          case 'multiply':
            result = a * b;
            break;
          case 'divide':
       
            if (b === 0) {
              res.statusCode = 400;
              res.end('Division by zero');
              return;
            }
            result = a / b;
            break;
          default:
            res.statusCode = 400;
            res.end('Invalid operation');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));

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
  console.log(`Calc server listening on port ${PORT}`);
});