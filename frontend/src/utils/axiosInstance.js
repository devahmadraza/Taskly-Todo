import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://localhost:2001/api",
})
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            window.dispatchEvent(new Event("authChanged"))
            if (window.location.pathname !== "/login") {
                window.location.href = "/login"
            }
        }
return Promise.reject(error)
    }
)
export default axiosInstance;