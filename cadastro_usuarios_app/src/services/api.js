import axios from 'axios'


//endereço para conectar com o backend
const api = axios.create({
    baseURL: 'http://localhost:3000'
})

export default api;