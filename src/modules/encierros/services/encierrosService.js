import api from "../../../api/api.js";
const ENDPOINT = '/encierros';

const construirErrorHttp = (error, mensajeDefault) => {
    const msg = error.response?.data?.mensaje || error.response?.data?.message || mensajeDefault;
    const err = new Error(msg);
    err.status = error.response?.status;
    err.data = error.response?.data;
    return err;
};

/*
OBTENER TODOS LOS ENCIERROS
*/

export const getEncierros = async () => {
    try {
        const response = await api.get(ENDPOINT);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron obtener los encierros");
    }
};

/*
CREAR UN ENCIERRO
*/

export const createEncierro = async (encierro) => {
    try {
        const response = await api.post(ENDPOINT, encierro);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo registrar el encierro");
    }
}

/*
OBTENER UN ENCIERRO POR ID
*/

export const getEncierroById = async (id) => {
    try {
        const response = await api.get(`${ENDPOINT}/${id}`);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener la información del encierro");
    }
};

/*
ACTUALIZAR UN ENCIERRO
*/

export const updateEncierro = async (id, encierro) => {
    try {
        const response = await api.put(`${ENDPOINT}/${id}`, encierro);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron guardar los cambios del encierro");
    }
};

/*
ELIMINAR UN ENCIERRO
*/

export const deleteEncierro = async (id) => {
    try {
        const response = await api.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo eliminar el encierro");
    }
};