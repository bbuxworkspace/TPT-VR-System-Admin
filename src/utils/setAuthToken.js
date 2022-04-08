import axios from "axios";

const setAuthToken = (token) => {
  if (localStorage.getItem("token_anbs") && !token) {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token_anbs");
  }
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
