import { BASE_URL } from "../config/env.config";
import { isObject } from "./index";

const getHeaders = (headers = {}) => {
  const additionalHeaders = {};
  return {
    ...additionalHeaders,
    ...headers
  };
};

const checkStatus = async (response, url) => {
  if (response.status >= 200 && response.status < 300) {
    try {
      let data = await response.json();
      return isObject(data) ? data : { data };
    } catch (error) {
      return {};
    }
  } else {
    let error = new Error(`Api Fail:${url}`);
    if (
      response.headers &&
      response.headers.get("Content-Type").indexOf("application/json") !== -1
    ) {
      let data = await response.json();
      const { errorCode, error: doNotUse, ...rest } = data; //eslint-disable-line
      error.errorCode = errorCode;
      error.data = rest;
    }
    error.statusCode = response.status;
    throw error;
  }
};

const makeCall = async (urlObj, reqObj = {}) => {
  try {
    let promise;
    promise = fetch(`${BASE_URL}${urlObj.url}`, {
      ...reqObj,
      credentials: "same-origin"
    });
    let response = await promise;
    response = await checkStatus(response, urlObj.url);
    return response;
  } catch (ex) {
    throw ex;
  }
};

const get = (urlObj, reqObj = {}) => {
  reqObj.method = "GET";
  reqObj.headers = getHeaders(reqObj.headers);
  return makeCall(urlObj, { ...reqObj });
};

const post = (urlObj, reqObj = {}) => {
  reqObj.method = "POST";
  reqObj.headers = getHeaders(reqObj.headers);
  return makeCall(urlObj, { ...reqObj });
};

const del = (urlObj, reqObj = {}) => {
  reqObj.method = "DELETE";
  reqObj.headers = getHeaders(reqObj.headers);
  return makeCall(urlObj, { ...reqObj });
};

export { get, post, del };
