import axios from "axios";
// http://localhost:8000/api/...
// https://chat-on-vves.vercel.app/api/
const api = axios.create({
    baseURL:'https://chat-on-vves.vercel.app/api/',
    headers:{
        "Content-Type":"application/json"
    }
})

export default api



export const get_logged_in_user = async (accessToken) => {
    const response = await api.get('logged-in-user/', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};