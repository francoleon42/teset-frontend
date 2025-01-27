import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'






export const getCliente = async (token) => {
    const endpoint = backendUrl + '/cliente/info';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const getClienteDetalle = async (token) => {
    const endpoint = backendUrl + '/cliente/detalle';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

