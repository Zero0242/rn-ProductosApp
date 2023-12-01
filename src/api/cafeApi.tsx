import axios from "axios";


const baseURL = "http://192.168.1.111:8080/api"
//const baseURL = "http://10.0.2.2:8080/api"


const cafeApi = axios.create({ baseURL })



export default cafeApi