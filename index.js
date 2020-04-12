/*
   L114 compiler service.
   @flow weak
*/
const langID = 114;
// SHARED START
const fs = require('fs');
const http = require("http");
const https = require("https");
const path = require('path');
const compiler = require("./lib/compile.js");
const {
  AuthError,
  createLambda,
} = require('@graffiticode/graffiticode-compiler-framework');
const jsonDiff = require("json-diff");
function postAuth(path, data, resume) {
  let encodedData = JSON.stringify(data);
  var options = {
    host: "auth.artcompiler.com",
    port: "443",
    path: path,
    method: "POST",
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(encodedData),
    },
  };
  var req = https.request(options);
  req.on("response", (res) => {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    }).on('end', function () {
      try {
        resume(null, JSON.parse(data));
      } catch (e) {
        console.log("ERROR " + data);
        console.log(e.stack);
      }
    }).on("error", function () {
      console.log("error() status=" + res.statusCode + " data=" + data);
    });
  });
  req.end(encodedData);
  req.on('error', function(err) {
    console.log("ERROR " + err);
    resume(err);
  });
}
function count(token, count) {
  postAuth("/count", {
    jwt: token,
    lang: "L" + langID,
    count: count,
  }, () => {});
}
const validated = {};
function validate(token, resume) {
  if (token === undefined) {
    resume(null, {
      address: "guest",
      access: "compile",
    });
  } else if (validated[token]) {
    resume(null, validated[token]);
    count(token, 1);
  } else {
    postAuth("/validate", {
      jwt: token,
      lang: "L" + langID,
    }, (err, data) => {
      validated[token] = data;
      resume(err, data);
      count(token, 1);
    });
  }
}
const recompileItem = (id, host, resume) => {
  let protocol, url;
  if (host === "localhost") {
    protocol = http;
    url = "http://localhost:3001/data/?id=" + id + "&refresh=true&dontSave=true";
  } else {
    protocol = https;
    url = "https://" + host + "/data/?id=" + id + "&refresh=true&dontSave=true";
  }
  var req = protocol.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    }).on('end', function () {
      try {
        resume([], JSON.parse(data));
      } catch (e) {
        console.log("ERROR " + data);
        console.log(e.stack);
        resume([e], null);
      }
    }).on("error", function () {
      console.log("error() status=" + res.statusCode + " data=" + data);
    });
  });
};
const testItems = (items, passed, failed, resume) => {
  if (items.length === 0) {
    resume([], "done");
    return;
  }
  let itemID = items.shift();
  let t0 = new Date;
  recompileItem(itemID, "localhost", (err, localOBJ) => {
    //console.log("testItems() localOBJ=" + JSON.stringify(localOBJ));
    let t1 = new Date;
    recompileItem(itemID, "www.graffiticode.com", (err, remoteOBJ) => {
      //console.log("testItems() remoteOBJ=" + JSON.stringify(remoteOBJ));
      let t2 = new Date;
      delete localOBJ.responseSVG;
      delete localOBJ.valueSVG;
      delete remoteOBJ.responseSVG;
      delete remoteOBJ.valueSVG;
      let diff = jsonDiff.diffString(remoteOBJ, localOBJ);
      if (!diff) {
        console.log((items.length + 1) + " PASS " + itemID);
        passed.push(itemID);
      } else {
        console.log((items.length + 1) + " FAIL " + itemID);
        console.log(diff);
        failed.push(itemID);
      }
      testItems(items, passed, failed, resume);
    });
  });
};
const msToMinSec = (ms) => {
  let m = Math.floor(ms / 60000);
  let s = ((ms % 60000) / 1000).toFixed(0);
  return (m > 0 && m + "m " || "") + (s < 10 && "0" || "") + s + "s";
}
const test = () => {
  fs.readFile("tools/test.json", (err, data) => {
    if (err) {
      console.log(err);
      data = "[]";
    }
    let t0 = new Date;
    let passed = [], failed = [];
    testItems(JSON.parse(data), passed, failed, (err, val) => {
      console.log(passed.length + " PASSED, " + failed.length + " FAILED (" + msToMinSec(new Date - t0) + ")");
      process.exit(0);
    });
  });
};
// SHARED STOP

const compilerDefinition = {
  language: langID,
  compile: (code, data, config) => {
    return new Promise((resolve, reject) => {
      compiler.compile(code, data, (err, val) => {
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      });
    });
  },
  auth: (token) => {
    return new Promise((resolve, reject) => {
      validate(token, (err, data) => {
        if (err) {
          reject(err);
        } else if (data.access.indexOf('compile') === -1) {
          reject(new AuthError('User does not have compile access'));
        } else {
          resolve(data);
        }
      });
    });
  },
  assetPath: path.join(__dirname, 'pub'),
};
exports.compiler = compilerDefinition;
exports.lambdaHandler = createLambda(compilerDefinition);
