import axios from "axios";

//declaring API port
const apiPort = '4466'

//declaring machine IP
const ip = '192.168.19.123'

//login API endpoint 
export const LoginResource = '/api/Login'
export const DoctorResource = '/api/Medicos'
<<<<<<< HEAD
export const ClinicResource = '/api/Clinica/ListarTodas'
export const QueryResource = '/api/Consultas'
export const DoctorQueryResource = '/api/Consultas/ConsultasMedico'
=======
export const ClinicListAll = '/api/Clinica/ListarTodas'
export const GetDoctorAppointment = '/api/Consultas'
>>>>>>> guilherme

const externalUrlApi = `http://${ip}:${apiPort}`

const api = axios.create({
    baseURL: externalUrlApi
})

export default api