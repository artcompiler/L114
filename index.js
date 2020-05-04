/*
   L114 compiler service.
   @flow weak
*/
const path = require('path');
const compiler = require('./lib/compile.js');
const {
  AuthError,
  createCloudFunction,
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

function setBuildsMetadata(data, build) {
  if (!data._) {
    data._ = {};
  }
  if (!data._.builds) {
    data._.builds = [];
  }
  data._.builds.push(build);
}

const build = require('./build.json');
const langID = 114;
const language = `L${langID}`;
const validateToken = createValidateToken({ lang: language });
const compilerDefinition = {
  language,
  compile: (code, data, config) => {
    return new Promise((resolve, reject) => {
      compiler.compile(code, data, (err, val) => {
        if (isError(err)) {
          reject(err);
        } else {
          setBuildsMetadata(val, build);
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
exports.cloudFunctionHandler = createCloudFunction(compilerDefinition);
