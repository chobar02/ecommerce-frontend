import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://chobarcart-api.onrender.com/api/v1/',
    withCredentials : true
})

export default axiosInstance