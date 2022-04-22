import axios from 'axios';

// Override axios default values
axios.defaults.baseURL = 'http://192.168.3.2:3000/api';
axios.defaults.timeout = 5000;

export default axios;
