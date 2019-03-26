import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000,
  validateStatus: status => {
    return status === 200; // Only 200 status codes handled by .then()
  }
});
