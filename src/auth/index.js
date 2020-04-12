const https = require('https');

function postAuth(path, data, resume) {
  let encodedData = JSON.stringify(data);
  var options = {
    host: 'auth.artcompiler.com',
    port: '443',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(encodedData),
    },
  };
  var req = https.request(options);
  req.on('response', (res) => {
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    }).on('end', function () {
      try {
        resume(null, JSON.parse(data));
      } catch (e) {
        console.log('ERROR ' + data);
        console.log(e.stack);
      }
    }).on('error', function () {
      console.log('error() status=' + res.statusCode + ' data=' + data);
    });
  });
  req.end(encodedData);
  req.on('error', function(err) {
    console.log('ERROR ' + err);
    resume(err);
  });
}
function count(token, count) {
  postAuth('/count', {
    jwt: token,
    lang: 'L' + langID,
    count: count,
  }, () => {});
}
const validated = {};
function validate(token, resume) {
  if (token === undefined) {
    resume(null, {
      address: 'guest',
      access: 'compile',
    });
  } else if (validated[token]) {
    resume(null, validated[token]);
    count(token, 1);
  } else {
    postAuth('/validate', {
      jwt: token,
      lang: 'L' + langID,
    }, (err, data) => {
      validated[token] = data;
      resume(err, data);
      count(token, 1);
    });
  }
}
exports.validate = validate;
