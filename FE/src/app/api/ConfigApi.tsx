import axios from 'axios'
const accessToken = localStorage.getItem("accessToken")
export const axiosPrivate = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`
    }
})

export const axiosFormData = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`
    }
})

axios.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)