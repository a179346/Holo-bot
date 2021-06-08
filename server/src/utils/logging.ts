/* eslint-disable no-console */
function getTime () {
  return new Date().toISOString();
}

function info (namespace:string, message: string, obj?: any) {
  if (obj) {
    console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`, obj);
  } else {
    console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`);
  }
}

function error (namespace:string, message: string, obj?: any) {
  if (obj) {
    console.error(`[${getTime()}] [ERROR] [${namespace}] ${message}`, obj);
  } else {
    console.error(`[${getTime()}] [ERROR] [${namespace}] ${message}`);
  }
}

export const logging = {
  info,
  error,
};