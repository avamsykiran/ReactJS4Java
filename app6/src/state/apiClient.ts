import axios from "axios";

const apiClient = axios.create({
    baseURL: '/api'
});

export const ahApiEndPoint = "/profiles/";
export const txnsApiEndPoint = "/txns/";
export const stmtApiEndPoint = "/statement/";

export default apiClient;