import { backendUrl } from '../connection/backUrl';
import {executeFetch} from '../connection/fetch'
import {HttpMethods} from '../connection/HttpMethods'



export const loginStepOne = async (data) => {
    const endpoint = backendUrl + '/auth/login/step-one';
   
    return await executeFetch(endpoint, data, HttpMethods.POST, null, 200);
};
export const loginStepTwo = async (data) => {
    const endpoint = backendUrl + '/auth/login/step-two';
    return await executeFetch(endpoint, data, HttpMethods.POST, null, 200);
};

export const updatePasswordStepOne = async (data) => {
    const endpoint = backendUrl + '/update/step-one/{dni}';
    return await executeFetch(endpoint, data, HttpMethods.PATCH, null, 200);
};


export const register = async (data, token) => {
    const endpoint = backendUrl + '/auth/register';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};

export const logout = async (token) => {
    const endpoint = backendUrl + '/auth/logout';
    return await executeFetch(endpoint, null, HttpMethods.POST, token, 200);
};


export const verAllUsers = async (token) => {
    const endpoint = backendUrl + '/auth/getAllUsers';
    return await executeFetch(endpoint, null, HttpMethods.GET, token, 200);
};

export const updateUser = async (data,id,token) => {
    const endpoint = backendUrl + '/auth/update/'+ id;
    return await executeFetch(endpoint, data, HttpMethods.PUT, token, 201);
};


export const habilitarUsuario = async (id, token) => { 
    const endpoint = backendUrl + '/auth/habilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};


export const inhabilitarUsuario = async (id, token) => { 
    const endpoint = backendUrl + '/auth/inhabilitar/' + id;
    return await executeFetch(endpoint, null, HttpMethods.PATCH, token, 200);
};