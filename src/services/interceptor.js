import axios from 'axios'
import qs from 'qs'
import configData from '../config.json'
import store from "../store"
import { fetchAccessToken } from '../actions/index'

const baseURL = configData.NEW_API_URL
let headers = {}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {

    const originalRequest = error.config
    if (error.response.status === 401) {

    
        // await axios({
        //     method: 'post',
        //     url: `${configData.AUTH_API_URL}`,
        //     data: qs.stringify({
        //         grant_type: 'client_credentials',
        //         scope: 'api.read',
        //         client_id: 'ewnsapi',
        //         client_secret: 'Laxmidevi@99'
        //     }),
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(res => {
        //     if (res.status === 200) {
        //         localStorage.setItem("token", res.data.access_token)
        //         return axiosInstance(originalRequest)
        //     }
        // })
        // return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
})

export default axiosInstance