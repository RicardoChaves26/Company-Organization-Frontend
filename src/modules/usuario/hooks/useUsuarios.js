import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Button from '../../../shared/components/Button.jsx';
import { getUsuarios, createUsuarios, updateUsuario, deleteUsuario } from "../services/ususariosService.js";

const initialFormState = {
    id_usuario: null,
    nombre: '',
    telefono: '',
    correo: '',
    usuario: '',
    password: '',
};

export const useUsuarios = (styles) => {
    // Detección responsiva de pantalla
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    // Estados de API y Formulario
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(initialFormState);

    // Estados para control del Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

    // Detectar si estamos en modo edición
    const idEdicion = form?.id_usuario || form?.id;
    const isEditing = Boolean(idEdicion);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleClear = () => {
        setForm(initialFormState);
        setError(null);
    };

    const fetchUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getUsuarios();
            setUsuarios(Array.isArray(data) ? data : data?.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRegister = async (onSuccess) => {
        try {
            setLoading(true);
            setError(null);
            const res = await createUsuarios(form);
            await fetchUsuarios();
            handleClear();
            if (onSuccess) onSuccess(res);
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateUsuario = async (id, formPayload, onSuccess) => {
        try {
            setLoading(true);
            setError(null);
            
            // Limpieza del payload enviado al backend
            const { nombre, telefono, correo, usuario, password } = formPayload;
            const payloadClean = { nombre, telefono, correo, usuario };
            if (password && password.trim() !== '') {
                payloadClean.password = password;
            }

            const res = await updateUsuario(id, payloadClean);
            await fetchUsuarios();
            
            if (onSuccess) onSuccess(res);
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUsuario = async (id, onSuccess) => {
        try {
            setLoading(true);
            setError(null);
            const res = await deleteUsuario(id);
            setUsuarios((prev) => prev.filter((u) => u.id !== id && u.id_usuario !== id));
            if (onSuccess) onSuccess(res);
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos del usuario en el formulario para editar
    const onEditPress = (item) => {
        setForm({
            id_usuario: item.id_usuario || item.id,
            nombre: item.nombre || '',
            telefono: item.telefono || '',
            correo: item.correo || '',
            usuario: item.usuario || '',
            password: '',
        });
    };

    // Abrir Modal de Confirmación
    const onDeletePress = (item) => {
        setUsuarioAEliminar(item);
        setModalVisible(true);
    };

    // Cerrar Modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setUsuarioAEliminar(null);
    };

    // Confirmar eliminación desde el modal
    const handleConfirmDelete = async () => {
        if (usuarioAEliminar) {
            const id = usuarioAEliminar.id || usuarioAEliminar.id_usuario;
            await handleDeleteUsuario(id);
            handleCloseModal();
        }
    };

    // Submit dinámico (Crear o Editar)
    const handleSubmit = async () => {
        if (isEditing) {
            await handleUpdateUsuario(idEdicion, form, () => {
                handleClear();
            });
        } else {
            await handleRegister();
        }
    };

    // Definición de Columnas de la Tabla
    const columns = [
        {
            key: 'nombre',
            title: 'NOMBRE / USUARIO',
            flex: 1.5,
            widthMobile: 160,
            render: (_, item) => (
                <View style={styles?.userCell}>
                    <Text style={styles?.userName} numberOfLines={1}>{item.nombre}</Text>
                    <Text style={styles?.userTag} numberOfLines={1}>@{item.usuario}</Text>
                </View>
            ),
        },
        {
            key: 'telefono',
            title: 'TELÉFONO',
            flex: 1,
            widthMobile: 120,
            render: (value, item) => (
                <Text style={styles?.textMuted} numberOfLines={1}>
                    {value || item.telefono}
                </Text>
            ),
        },
        {
            key: 'correo',
            title: 'CORREO ELECTRÓNICO',
            flex: 2,
            widthMobile: 180,
            render: (value, item) => (
                <Text style={styles?.textEmail} numberOfLines={1} ellipsizeMode="tail">
                    {value || item.correo}
                </Text>
            ),
        },
        {
            key: 'acciones',
            title: 'ACCIONES',
            flex: 1,
            widthMobile: 120,
            align: 'center',
            render: (_, item) => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                    }}
                >
                    <Button
                        variant=""
                        icon="pencil"
                        dense
                        onPress={() => onEditPress(item)}
                    />
                    <Button
                        variant=""
                        icon="trash"
                        dense
                        onPress={() => onDeletePress(item)}
                    />
                </View>
            ),
        },
    ];

    useEffect(() => {
        fetchUsuarios();
    }, [fetchUsuarios]);

    return {
        // Layout Responsivo
        isMobile,
        
        // Estado y Manejo del Formulario
        form,
        isEditing,
        handleChange,
        handleClear,
        handleSubmit,
        
        // Estados y Manejo de Modal
        modalVisible,
        usuarioAEliminar,
        handleCloseModal,
        handleConfirmDelete,
        
        // Datos, Columnas y Estados API
        usuarios,
        columns,
        loading,
        error,
        
        // Funciones CRUD explícitas por si se necesitan afuera
        fetchUsuarios,
        handleRegister,
        handleUpdateUsuario,
        handleDeleteUsuario,
    };
};