import api from "../../../api/api.js";
const ENDPOINT = '/lotes';

const construirErrorHttp = (error, mensajeDefault) => {
    const msg = error.response?.data?.mensaje || error.response?.data?.message || mensajeDefault;
    const err = new Error(msg);
    err.status = error.response?.status;
    err.data = error.response?.data;
    return err;
};

/*
OBTENER TODOS LOS LOTES
*/
export const getLotes = async () => {
    try {
        const response = await api.get(ENDPOINT);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron obtener los lotes");
    }
};

/*
CREAR UN LOTE
*/
export const createLote = async (lote) => {
    try {
        const response = await api.post(ENDPOINT, lote);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo registrar el lote");
    }
};

/*
OBTENER UN LOTE POR ID
*/
export const getLoteById = async (id) => {
    try {
        const response = await api.get(`${ENDPOINT}/${id}`);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener la información del lote");
    }
};

/*
ACTUALIZAR UN LOTE
*/
export const updateLote = async (id, lote) => {
    try {
        const response = await api.put(`${ENDPOINT}/${id}`, lote);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron guardar los cambios del lote");
    }
};

/*
ELIMINAR
*/
export const deleteLote = async (id) => {
    try {
        const response = await api.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo eliminar el lote");
    }
};

/*
FINALIZAR UN LOTE
*/
export const finalizeLote = async (id) => {
    try {
        const response = await api.put(`${ENDPOINT}/${id}/finalizar`);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo finalizar el lote");
    }
};