const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('OK');
    return;
  }

  if (req.method === 'POST' && req.url === '/json-object') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (
          data.name === undefined || 
          data.age === undefined || 
          typeof data.age !== 'number'
        ) {
          res.statusCode = 422;
          res.end('Unprocessable Entity');
          return;
        }

        const result = {
          greeting: `Hello ${data.name}`,
          isAdult: data.age >= 18
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