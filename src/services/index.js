import axios from 'axios';
import config from '@/config';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: 10})

export const listarUbicaciones = async () => {
    const url = `${config.api}/listar-ubicaciones`;
    console.log(url);
    return await axios.get(`${url}`)
}

// export const getImagenUbicacion = async (id_ubicacion_modelo) => {
//     const url = `${config.api}/imagen-ubicacion`;
//     return await axios.get(`${url}/${id_ubicacion_modelo}`, {responseType: 'blob'})
// }

export const getFechasLimite = async () => {
    const url = `${config.api}/fechas-limite`;
    console.log(url);
    return await axios.get(`${url}`)
}

export const listarGraficosMetricas = async () => {
    const url = `${config.api}/listar-graficos-metricas`;
    console.log(url);
    return await axios.get(`${url}`)
}
