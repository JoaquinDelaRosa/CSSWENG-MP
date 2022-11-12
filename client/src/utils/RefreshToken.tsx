import axios from "axios";
import { BASE_URL, createAPIEndpoint, ENDPOINTS, updateToken } from "../api";

const refreshToken = () => {
    axios.post(BASE_URL + 'api/' + ENDPOINTS.refreshToken, {}, {withCredentials : true })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err);
    })
}

export default refreshToken;