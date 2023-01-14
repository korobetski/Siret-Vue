import axios from "axios";

const apiClient = axios.create({
    baseURL : 'http://localhost:8000/api',
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  });
  
export default apiClient;
