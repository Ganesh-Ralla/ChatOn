import axios from "axios";

const api = axios.create({
    baseURL:'https://chat-on-vves.vercel.app/api/',
    headers:{
        "Content-Type":"application/json"
    }
})

export default api