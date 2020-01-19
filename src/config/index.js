import axios from "axios";

const instance = axios.create({
  baseURL: " https://roles.viewclass.com/api/"
});

export default instance;
