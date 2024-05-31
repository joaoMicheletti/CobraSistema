import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:1234',
    timeout: 1000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
  });


export default api;