import axios from 'axios'

const axiosInstance = axios.create({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`
})

export default { axiosInstance }