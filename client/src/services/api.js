const _apiHost = "http://localhost:8000";

async function request(url, params, method = "GET") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (params !== undefined && params.token !== undefined) {
    options.headers["authorization"] = `Bearer ${params.token}`
    delete params.token
  }

  if (params) {
    if (method === "GET") {
      url += "?" + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(_apiHost + url, options);

  if (response.status !== 200) {
    return generateErrorResponse(
      "The server responded with an unexpected status."
    );
  }

  try {
    return await response.json();
  } catch (e) {
    return response;
  }
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map(key => key + "=" + obj[key])
    .join("&");
}

function generateErrorResponse(message) {
  return {
    status: "error",
    message
  };
}

function get(url, params) {
  return request(url, params);
}

function create(url, params) {
  return request(url, params,"POST");
}

function update(url, params) {
  return request(url, params,"PUT");
}

function remove(url, params) {
  return request(url, params,"DELETE");
}

const api = {
  get: get,
  create: create,
  update: update,
  remove: remove
}

export default api
