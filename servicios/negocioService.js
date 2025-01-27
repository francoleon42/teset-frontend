import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'



export const getComerciosAdheridos = async (token) => {
    const endpoint = backendUrl + '/negocio/comercios_adheridos';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const getContactos = async (token) => {
    const endpoint = backendUrl + '/negocio/contactos';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};
export const getNovedades = async (token) => {
    const endpoint = backendUrl + '/negocio/novedades';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const getComerciosAdheridosByName = async (token, nombre) => {
    const endpoint = `${backendUrl}/negocio/comercios_adheridos_by_name?nombre=${encodeURIComponent(nombre)}`;
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};