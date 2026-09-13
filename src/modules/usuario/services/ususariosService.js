import api from "../../../api/api.js";
const ENDPOINT = '/usuario';

const construirErrorHttp = (error, mensajeDefault) => {
    const msg = error.response?.data?.mensaje || error.response?.data?.message || mensajeDefault;
    const err = new Error(msg);
    err.status = error.response?.status;
    err.data = error.response?.data;
    return err;
};

/*
OBTENER TODOS LOS USUARIOS
*/

export const getUsuarios = async () => {
    try {

        const response = await api.get(ENDPOINT);

        return response.data.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron obtener los usuarios");
    }
};

/*
CREAR UN USUARIO
*/

export const createUsuarios = async (usuario) => {
    try {

        const response = await api.post(ENDPOINT, usuario);

        return response.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudo registrar el usuario");
    }
}

/*
OBTENER UN USUARIO POR USERNAME
NOTA: No se sabe si se utilizara.
*/

export const geyByUsername = async (username) => {
    try {

        const response = await api.get(`${ENDPOINT}/username/${username}`);

        return response.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener el usuario por username");
    }
}

/*
OBTENER UN USUARIO POR ID
*/

export const getUsuarioById = async (id) => {
    try {

        const response = await api.get(`${ENDPOINT}/${id}`);

        return response.data.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudo obtener la información del usuario");
    }
};

/*
ACTUALIZAR UN USUARIO
*/

export const updateUsuario = async (id, usuario) => {
    try {

        const response = await api.put(`${ENDPOINT}/${id}`, usuario);

        return response.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudieron guardar los cambios del usuario");
    }
};

/*
ELIMINAR UNA VENTA
*/

export const deleteUsuario = async (id) => {
    try {

        const response = await api.delete(`${ENDPOINT}/${id}`);

        return response.data;

    } catch (error) {
        throw construirErrorHttp(error, "No se pudo eliminar el usuario");
    }
};