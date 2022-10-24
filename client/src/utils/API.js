import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "https://prograrmorprealpha1.herokuapp.com/";

export default {

  //LOGIN SIGNUP
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

  },

  //SESSION
  debutantform: function(seance) {
    return axios.post(`${burl}/user/debutantform`,{seance},{headers: headers});

  },

  workouts: function(params){
        let string = "";
        let keyArray = [];
        Object.keys(params).forEach(key => {keyArray.push(key)});
        Object.values(params).forEach((param,index) => {
            string = string + keyArray[index] + "=" + param
            if (index !== (Object.values(params).length-1)){
                string = string + "&"
            };
        })

      return axios.get(`${burl}/user/workouts?`+string, { headers: headers });

  },

  getUser: function(){
      return axios.get(`${burl}/user/getUser`, { headers: headers });

  }
};