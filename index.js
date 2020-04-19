/*
   L114 compiler service.
   @flow weak
*/
const langID = 114;
const path = require('path');
const compiler = require('./lib/compile.js');
const {
  AuthError,
  createLambda,
  createValidateToken,
} = require('@graffiticode/graffiticode-compiler-framework');

function isError(err) {
  if (err instanceof Error) {
    return true;
  }
  if (Array.isArray(err) && err.length > 0) {
    return true;
  }
  return false;
}

const validateToken = createValidateToken({ lang: langID });
const compilerDefinition = {
  language: langID,
  compile: (code, data, config) => {
    return new Promise((resolve, reject) => {
      compiler.compile(code, data, (err, val) => {
        if (isError(err)) {
          reject(err);
        } else {
          resolve(val);
        }
      });
    });
  },
  auth: async (token) => {
    const res = await validateToken(token);
    if (res.access.indexOf('compile') === -1) {
      throw new AuthError('User does not have compile access');
    }
  },
  assetPath: path.join(__dirname, 'pub'),
};
exports.compiler = compilerDefinition;
exports.lambdaHandler = createLambda(compilerDefinition);
