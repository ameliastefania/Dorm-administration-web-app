import axios from 'axios';
import * as rute from './ruteApi.js'

import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const BASE_URL = 'http://localhost:8000/api';
const axiosPrivate = axios.create({
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

axiosPrivate.interceptors.request.use(
    async function(req) {    
        let localStorageItem = JSON.parse(localStorage.getItem("login"));
        let accessToken = localStorageItem?.accessToken;
        if (!accessToken)
            return req;

        let user = jwt_decode(accessToken);  
        console.log(user)
        let isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;     
        console.log(dayjs.unix(user.exp))  
        if (!isExpired)
        {
            req.headers.Authorization = `Bearer ${localStorageItem.accessToken}`;
            return req;         
        }      
        let newAccesToken  = await getRefreshToken(BASE_URL+rute.REFRESH_URL)   
        if (!newAccesToken) {        
           return req
        }   
        var localStorageVechi = JSON.parse(localStorage.getItem("login"))     
        localStorageVechi.accessToken = newAccesToken         
        req.headers.Authorization = `Bearer ${newAccesToken}`;
        localStorage.setItem("login",JSON.stringify(localStorageVechi))
        return req;
    })

async function getRefreshToken(rutaApi) {  
    let response = null;
    try {
            response = await axios.get(rutaApi, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });   
    }
    catch(err) {
        console.log(err)
    }
    if (response) {
        return response.data.accessToken;
    } else {
        let lsItem = JSON.parse(localStorage.getItem("login"))
        Object.keys(lsItem).forEach(function(key) {
            lsItem[key] = null;
        });
        localStorage.setItem("login",JSON.stringify(lsItem))
        return null;   
    }   
}

export default axiosPrivate