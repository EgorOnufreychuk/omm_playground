const _apiHost = "http://localhost:8000/api";

async function request(url, params, tokens={}, method = "GET") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  if (tokens) {
    options.headers["access"] = `Bearer ${tokens.accessToken}`
    options.headers["refresh"] = `Bearer ${tokens.refreshToken}`
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

function get(url, params, token) {
  return request(url, params, token);
}

function create(url, params) {
  return request(url, params, {},"POST");
}

function update(url, params) {
  return request(url, params, {},"PUT");
}

function remove(url, params) {
  return request(url, params, {},"DELETE");
}

export default {
  get,
  create,
  update,
  remove
};
