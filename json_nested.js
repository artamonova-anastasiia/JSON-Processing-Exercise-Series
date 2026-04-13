const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('OK');
    return;
  }

  if (req.method === 'POST' && req.url === '/json-nested') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (!data.user || typeof data.user !== 'object') {
          res.statusCode = 422;
          res.end('Missing user');
          return;
        }

        const { user } = data;

        if (!user.roles || !Array.isArray(user.roles)) {
          res.statusCode = 422;
          res.end('Invalid roles');
          return;
        }
        const result = {
          name: user.name || "Anonymous",
          roleCount: user.roles.length,
          isAdmin: user.roles.includes("admin")
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