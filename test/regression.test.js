const http = require('http');
const { createApp } = require('@graffiticode/graffiticode-compiler-framework');
const { compiler } = require('./../');
const apiApp = require('@graffiticode/api');

describe('regression', () => {
  // TODO(kevindyer) Create list IDs (with data) to run through both current and local compilers
  let apiServer;
  beforeAll((done) => {
    apiServer = http.createServer(apiApp);
    apiServer.on('error', (err) => console.log(`ERROR API Server: ${err.message}`));
    apiServer.listen(0, done);
  });

  let compilerServer;
  beforeAll((done) => {
    compilerServer = http.createServer(createApp(compiler));
    compilerServer.on('error', (err) => console.log(`ERROR Compiler Server: ${err.message}`));
    compilerServer.listen(0, done);
  });

  afterAll((done) => compilerServer.close(done));
  afterAll((done) => apiServer.close(done));

  function makeApiRequest({ method='GET', headers={}, path, body }={}) {
    return new Promise((resolve, reject) => {
      if (typeof body === 'object' && body !== null) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      if (typeof body === 'string') {
        body = Buffer.from(body);
      }
      if (Buffer.isBuffer(body)) {
        headers['Content-Length'] = body.length;
      }
      const { port } = apiServer.address();
      const options = {
        method,
        host: 'localhost',
        port,
        headers,
        path,
      };
      const req = http.request(options, (res) => {
        const chunks = [];
        res.on('error', reject);
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      });
      req.on('error', reject);
      if (Buffer.isBuffer(body)) {
        req.write(body);
      }
      req.end();
    });
  }

  it('use /lang', async () => {
    // Arrange

    // Act
    const { statusCode, body } = await makeApiRequest({
      path: '/lang?id=114',
    });

    // Assert
    expect(statusCode).toEqual(200);
  });

  it('use /L114', async () => {
    // Arrange

    // Act
    const { statusCode, body } = await makeApiRequest({
      path: '/L114',
    });

    // Assert
    expect(statusCode).toEqual(200);
  });

  it('use /L114/lexicon.js', async () => {
    // Arrange

    // Act
    const { statusCode, body } = await makeApiRequest({
      path: '/L114/lexicon.js',
    });

    // Assert
    expect(statusCode).toEqual(200);
  });

  it('use /L114/viewer.js', async () => {
    // Arrange

    // Act
    const { statusCode, body } = await makeApiRequest({
      path: '/L114/viewer.js',
    });

    // Assert
    expect(statusCode).toEqual(200);
  });
});
