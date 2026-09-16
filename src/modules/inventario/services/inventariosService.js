import api from "../../../api/api.js";
const ENDPOINT = '/inventario';

const construirErrorHttp = (error, mensajeDefault) => {
    const msg = error.response?.data?.mensaje || error.response?.data?.message || mensajeDefault;
    const err = new Error(msg);
    err.status = error.response?.status;
    err.data = error.response?.data;
    return err;
};

/*
OBTENER TODO EL INVENTARIO
*/
export const getInventarios = async () => {
    try {
        const response = await api.get(ENDPOINT);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener el inventario");
    }
};

/*
CREAR UN ARTICULO DE INVENTARIO
*/
export const createInventario = async (lote) => {
    try {
        const response = await api.post(ENDPOINT, lote);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo registrar el producto");
    }
};

/*
OBTENER UN ARTICULO POR ID
*/
export const getInventarioById = async (id) => {
    try {
        const response = await api.get(`${ENDPOINT}/${id}`);
        return response.data.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener la información del inventario");
    }
};

/*
ACTUALIZAR UN ARTICULO DE INVENTARIO
*/
export const updateInventario = async (id, lote) => {
    try {
        const response = await api.put(`${ENDPOINT}/${id}`, lote);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron guardar los cambios del inventario");
    }
};

/*
ELIMINAR
*/
export const deleteInventario = async (id) => {
    try {
        const response = await api.delete(`${ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        throw construirErrorHttp(error, "No se pudo eliminar el articulo de inventario");
    }
};