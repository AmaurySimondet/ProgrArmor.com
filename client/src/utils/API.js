import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {
    return axios.post(`${burl}/user/login`,{email,password},{headers: headers});
  },

  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  facebook: function() {
    return axios.get(`${burl}/user/auth/facebook`, { headers: headers })
  },

  facebookAuthenticate: function() {
    return axios.get(`${burl}/user/auth/facebook/authenticate`, { headers: headers })
  },

  google: function() {
    return axios.get(`${burl}/user/auth/google`, { headers: headers })
  },

  googleAuthenticate: function() {
    return axios.get(`${burl}/user/auth/google/authenticate`, { headers: headers })
  },

  isAuth: function() {
    return (localStorage.getItem("token") !== null);
  },

  facebookToken: function() {
    return axios.get(`${burl}/user/facebookToken`, { headers: headers })
  },

  googleToken: function() {
    return axios.get(`${burl}/user/googleToken`, { headers: headers })
  },

  logout: function() {
    return axios.get(`${burl}/user/logout`, { headers: headers });
  }
};