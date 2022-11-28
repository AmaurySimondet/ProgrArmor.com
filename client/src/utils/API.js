import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800" // http://localhost:8800 https://prograrmorprealpha1.herokuapp.com

function paramsToString(params) {
  let string = "";
  let keyArray = [];
  Object.keys(params).forEach(key => { keyArray.push(key) });
  Object.values(params).forEach((param, index) => {
    string = string + keyArray[index] + "=" + param
    if (index !== (Object.values(params).length - 1)) {
      string = string + "&"
    };
  })
  return string
}

export default {

  //LOGIN SIGNUP
  login: function (email, password) {
    return axios.post(`${burl}/user/login`, { email, password }, { headers: headers });

  },

  signup: function (send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });

  },

  verifyToken: function (send) {
    return axios.post(`${burl}/user/verifyToken`, send, { headers: headers });

  },

  facebook: function () {
    return axios.get(`${burl}/user/auth/facebook`, { headers: headers })

  },

  facebookAuthenticate: function () {
    return axios.get(`${burl}/user/auth/facebook/authenticate`, { headers: headers })

  },

  google: function () {
    return axios.get(`${burl}/user/auth/google`, { headers: headers })

  },

  googleAuthenticate: function () {
    return axios.get(`${burl}/user/auth/google/authenticate`, { headers: headers })

  },

  isAuth: async function () {
    if (localStorage.getItem("token") !== null) {
      const result = await axios.post(`${burl}/user/verifyToken`, { token: localStorage.getItem("token") }, { headers: headers });
      //        console.log(result)
      if (result.data.success === true) {
        return true
      }
    }
    return false;

  },

  logout: function () {
    return axios.get(`${burl}/user/logout`, { headers: headers });

  },

  //SESSION
  debutantform: function (send) {
    return axios.post(`${burl}/user/debutantform`, send, { headers: headers });

  },

  supprSeance: function (send) {
    return axios.post(`${burl}/user/supprSeance`, send, { headers: headers });

  },

  workouts: function (params) {
    let string = paramsToString(params);

    return axios.get(`${burl}/user/workouts?` + string + "&id=" + localStorage.getItem("id"), { headers: headers });

  },

  loadSeance: function (params) {
    let string = paramsToString(params);

    return axios.get(`${burl}/user/loadSeance?` + string + "&id=" + localStorage.getItem("id"), { headers: headers });

  },

  getUser: function (id) {
    return axios.post(`${burl}/user/getUser`, id, { headers: headers });

  },

  //COMPTE
  modifyUser: function (send) {
    return axios.post(`${burl}/user/modifyUser`, send, { headers: headers });

  },

  reguScore: function (send) {
    return axios.post(`${burl}/user/reguScore`, send, { headers: headers });

  },

  //PROGRAMMES
  getProgrammes: function (send) {
    return axios.post(`${burl}/user/getProgrammes`, send, { headers: headers });

  },
};