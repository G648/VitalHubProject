import axios from "axios";

//declaring API port
const apiPort = '4466'

//declaring machine IP
const ip = '192.168.21.101'

//login API endpoint 
export const LoginResource = '/api/Login'
export const DoctorResource = '/api/Medicos'
export const ClinicResource = '/api/Clinica/ListarTodas'

const externalUrlApi = `http://${ip}:${apiPort}`

const api = axios.create({
    baseURL: externalUrlApi
})

export default api;