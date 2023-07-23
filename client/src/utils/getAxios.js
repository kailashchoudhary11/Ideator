import axios from "axios";
import Cookies from 'js-cookie';

export default function getAxios() {
  const csrftoken = Cookies.get('csrftoken');
  axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
  axios.defaults.withCredentials = true;
  return axios;
}