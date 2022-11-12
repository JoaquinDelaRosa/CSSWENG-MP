import axios from "axios";
import { BASE_URL, createAPIEndpoint, ENDPOINTS, updateToken } from "../api";

const refreshToken = () => {
    axios.post(BASE_URL + 'api/' + ENDPOINTS.refreshToken, {}, { headers : {"Access-Control-Allow-Credentials" : true, 'Content-Type': 'application/json'} , withCredentials : true })
    .then((res) => {
        updateToken(res.data.token)
    })
    .catch((err) => {
        console.log(err);
    })
}

export default refreshToken;