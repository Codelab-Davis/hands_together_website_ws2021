import axios from 'axios';

axios.interceptors.request.use(
    req => {
        if(req.url.includes('sold_items') || req.url.includes('cancel_order')) {
            let accessToken = JSON.parse(localStorage.getItem('accessToken'));
            req.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return req;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        const originalRequest = error.config;
        let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        if(refreshToken && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post("http://localhost:5000/jwt/token", { token: refreshToken })
             .then(res => {
                 if(res.status == 200) {
                     localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
                     console.log("Access Token Refreshed");
                     return axios(originalRequest);
                 }
             });
        }
        return Promise.reject(error);
    }
);
