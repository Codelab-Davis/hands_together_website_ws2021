import axios from 'axios';

axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        const originalRequest = error.config;
        if(error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post("http://localhost:5000/jwt/token", {}, { withCredentials: true})
             .then(res => {
                 if(res.status == 200) {
                     console.log("Access Token Refreshed");
                     return axios(originalRequest);
                 }
             });
        }
        return Promise.reject(error);
    }
);
