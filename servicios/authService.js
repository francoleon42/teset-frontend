import { backendUrl } from '../connection/backUrl';
import { executeFetch } from '../connection/fetch'
import { HttpMethods } from '../connection/HttpMethods'



export const loginStepOne = async (data) => {
    
    const endpoint = backendUrl + '/auth/login/step-one';
    return await executeFetch(endpoint, data, HttpMethods.POST, null, 200);
};


export const loginStepTwo = async (data) => {
    const endpoint = backendUrl + '/auth/login/step-two';
    return await executeFetch(endpoint, data, HttpMethods.POST, null, 200);
};

export const updatePasswordStepOne = async (data) => {
    const dni = data.dni;
    const endpoint = backendUrl + `/auth/update/step-one/` + dni;
    return await executeFetch(endpoint, data, HttpMethods.PATCH, null, 200);
};

export const updatePasswordStepTwo = async (data) => {
    const endpoint = backendUrl + `/auth/update/step-two`;
    return await executeFetch(endpoint, data, HttpMethods.PATCH, null, 200);
};

export const registroStepOne = async (data, token) => {
    const endpoint = backendUrl + '/auth/register/step-one';
    return await executeFetch(endpoint, data, HttpMethods.POST, token, 201);
};
export const registroStepTwo = async (data, token) => {
    const endpoint = backendUrl + '/auth/register/step-two';
    return await executeFetch(endpoint, data, HttpMethods.PATCH, token, 200);
};

export const logout = async (token) => {
    const endpoint = backendUrl + '/auth/logout';
    return await executeFetch(endpoint, null, HttpMethods.POST, token, 200);
};

