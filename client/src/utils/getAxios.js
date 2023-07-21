import axios from "axios";
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
axios.defaults.withCredentials = true;

export default axios;