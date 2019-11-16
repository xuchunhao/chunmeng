import axios from 'axios';
import cookieFunction from "@/cookie/cookieFunction.js";

var api = {
  test(params) {
    return axios.post('/api/captcha',params)
  },
  Captcha(params) {
    return axios.post('/api/external/captcha',params)
  },
  register(params){
    return axios.post('/api/user/register',params)
  },
  login(params){
    return axios.post('/api/user/login',params)
  },
  getUserInfo(params){
    let token = cookieFunction.getCookie("token");
    return axios.get('/api/user/info?token=' + token ,params)
  },
  updateUserinfo(params){
    let token = cookieFunction.getCookie("token");
    return axios.post('/api/user/info/update?token=' + token ,params)
  },
  changePortrait(params) {
    let token = cookieFunction.getCookie('token');
    return axios.post('/api/external/pic?token=' + token,params)
  },
  getLostProperty(params) {
    let token = cookieFunction.getCookie('token');
    return axios.get('/api/external/get/property?token=' + token + "&type=2",params)
  },
  getFindProperty(params) {
    let token = cookieFunction.getCookie('token');
    return axios.get('/api/external/get/property?token=' + token + "&type=1",params)
  },
  uploadImg(params) {
    let token = cookieFunction.getCookie('token');
    return axios.post('/api/external/pic?token=' + token, params);
  },
  addLostProperty(params) {
    let token = cookieFunction.getCookie('token');
    return axios.post('/api/external/property?token=' + token,params)
  },
  addFindProperty(params) {
    let token = cookieFunction.getCookie('token');
    return axios.post('/api/external/property?token=' + token,params)
  },
}

export default api;