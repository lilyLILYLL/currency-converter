import moment from "moment";
import axios from "axios";
//https://v6.exchangerate-api.com/v6/ba9272bb0aa912f471a4f31b/latest/USD

export const api = axios.create({
    baseURL:
        "https://v6.exchangerate-api.com/v6/ba9272bb0aa912f471a4f31b/latest",
});
