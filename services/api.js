import axios from "axios";

const api = axios.create({
  //WRITE CONFIG HERE
  baseURL: "https://nameless-sands-57704.herokuapp.com/v1/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});

export default api;
