import axios from 'axios'
import axiosRetry from 'axios-retry';

import { toast } from 'react-toastify'
import { redirect,Navigate } from 'react-router-dom'

const apiBaseUrl = process.env.REACT_APP_API_URL;
const tokenStorageKey = process.env.REACT_APP_ACCESS_STORAGE_KEY;
axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 1000;
    }
});
export const Api = {
    "Post": (url, data) => {
        if (data) {
            return axios.post(apiBaseUrl + url, data, {
                headers: {
                    'Access-Control-Allow-Origin': "*"
                }
            });
        } else {
            throw new Error("Pass Data Object");
        }
    },
    "Put": (url, data, header) => {
        if (data) {
            header = header === undefined ? {} : header;
            header['Access-Control-Allow-Origin'] = "*";
            return axios.put(apiBaseUrl + url, data, {
                headers: header
            });
        } else {
            throw new Error("Pass Data Object");
        }
    },
    "FileUploadPut": (url, data) => {
        if (data) {
            return axios.put(apiBaseUrl + url, data, {
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            throw new Error("Pass Data Object");
        }
    },
    "FileUploadPost": (url, data) => {
        if (data) {
            return axios.post(apiBaseUrl + url, data, {
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            throw new Error("Pass Data Object");
        }
    },
    "Delete": (url) => {
        return axios.delete(apiBaseUrl + url, {
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        });
    },
    "Get": (url, useDefault) => {
        let head = useDefault !== undefined && useDefault !== null && !useDefault ? {} : {
            'Access-Control-Allow-Origin': "*",
        };
        return axios.get((useDefault !== undefined && useDefault !== null && !useDefault ? '' : apiBaseUrl) + url, {
            headers: head
        });
    },
    MultiCall: (promises) => { //Array of Promises
        return axios.all(promises);
    }
}

const logoutHandler = (e) => {
    e?.preventDefault();
    var loginModel = {
        isAuthenticated: false
    }
    window.localStorage.setItem(process.env.REACT_APP_ACCESS_STORAGE_KEY, JSON.stringify(loginModel));
    window.localStorage.setItem(process.env.REACT_APP_ACCESS_PERMISSION_KEY, JSON.stringify({}));
}

axios.interceptors.request.use(
    (config) => {
        var token = localStorage.getItem(tokenStorageKey);
        token = JSON.parse(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
            document.body.classList.add('loading-indicator');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => {
        document.body.classList.remove('loading-indicator');
        if (res?.status === 200) {
        }
       
        return res;
    },
    (err) => {
        document.body.classList.remove('loading-indicator');
        if (err?.status === 500)
            toast.error('Something Went Wrong');

        if (err?.response?.status === 400) {
            toast.warn(err?.response?.data?.Message)
        }
        if (err?.response?.status === 401) { 
            logoutHandler();
           return redirect("/login");
        }
        return Promise.reject(err);
    }
);

// axios.interceptors.request.use(
//     (req) => {
//         //Show Loader on api call
//         debugger;
//         document.body.classList.add('loading-indicator');

//         var token = localStorage.getItem(tokenStorageKey);

//         if (req.url.indexOf(apiUrls.authController.getToken) === -1) {
//             if (token === undefined || token === null)
//                 return req;
//             token = JSON.parse(token);
//             var tokenData = jwt_decode(token?.accessToken);

//             if (common.validateGuid(token?.userResponse?.id) && common.checkTokenExpiry(tokenData?.exp)) {
//                 req.headers.Authorization = `bearer ${token?.accessToken}`;
//                 req.headers.userid = token.userResponse?.id;
//                 return req;
//             }
//         }
//         return req;
//     }
// )