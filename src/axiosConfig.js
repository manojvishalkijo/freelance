
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'; // Your base URL
axios.defaults.withCredentials = true;

export default axios;
