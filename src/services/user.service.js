import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getBoardList(requestBody) {
    return axios.get("http://localhost:8080/board/list", {
      headers: authHeader(),
      params: requestBody,
    });
  }

  getUserList(requestBody) {
    return axios.get("http://localhost:8080/user/list", {
      headers: authHeader(),
      params: requestBody,
    });
  }

  getUserRole(requestBody) {
    return axios.get("http://localhost:8080/user/roles", {
      headers: authHeader(),
      params: requestBody,
    });
  }

  removeUserRole(requestBody) {
    return axios.delete("http://localhost:8080/user/roles", {
      headers: authHeader(),
      params: requestBody,
    });
  }

  saveUserRole(requestBody) {
    return axios.post("http://localhost:8080/user/roles", {
      headers: authHeader(),
      params: requestBody,
    });
  }
}

export default new UserService();
