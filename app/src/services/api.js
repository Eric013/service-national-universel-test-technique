import "isomorphic-fetch";

import { apiURL } from "../config";

class api {
  constructor() {
    this.token = "";
    this.timeout = 10000;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  setGlobalTimeout(timeout) {
    this.timeout = timeout;
  }

  async fetchWithTimeout(resource, options = {}) {
    const { timeout = this.timeout } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(id);

    return response;
  }

  get(path) {
    return this.fetchWithTimeout(`${apiURL}${path}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
    })
      .then((response) => response.json())
      .catch((e) => e);
  }

  put(path, body) {
    return this.fetchWithTimeout(`${apiURL}${path}`, {
      mode: "cors",
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((e) => e);
  }

  remove(path) {
    return this.fetchWithTimeout(`${apiURL}${path}`, {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
    })
      .then((response) => response.json())
      .catch((e) => e);
  }

  post(path, body) {
    return this.fetchWithTimeout(`${apiURL}${path}`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((e) => e);
  }
}

const API = new api();
export default API;
