import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-jade-two.vercel.app'
})

export default axiosPublic;