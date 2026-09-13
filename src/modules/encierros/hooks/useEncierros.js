import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Button from '../../../shared/components/Button.jsx';
import { 
    getEncierros, 
    createEncierro, 
    updateEncierro, 
    deleteEncierro 
} from '../services/encierrosService.js';

const initialFormState = {
    id_encierro: null,
    codigo_encierro: '',
};

export const useEncierros = (styles) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [encierros, setEncierros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState(initialFormState);

    const [modalVisible, setModalVisible] = useState(false);
    const [encierroAEliminar, setEncierroAEliminar] = useState(null);

    const idEdicion = form?.id_encierro || form?.id;
    const isEditing = Boolean(idEdicion);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleClear = () => {
        setForm(initialFormState);
        setError(null);
    };

    const fetchEncierros = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getEncierros();
            setEncierros(Array.isArray(data) ? data : data?.data || []);
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
            const payload = { codigo_encierro: form.codigo_encierro };
            const res = await createEncierro(payload);
            await fetchEncierros();
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

    const handleUpdateEncierro = async (id, formPayload, onSuccess) => {
        try {
            setLoading(true);
            setError(null);

            const payloadClean = { codigo_encierro: formPayload.codigo_encierro };

            const res = await updateEncierro(id, payloadClean);
            await fetchEncierros();
            
            if (onSuccess) onSuccess(res);
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEncierro = async (id, onSuccess) => {
        try {
            setLoading(true);
            setError(null);
            const res = await deleteEncierro(id);
            setEncierros((prev) => prev.filter((e) => e.id !== id && e.id_encierro !== id));
            if (onSuccess) onSuccess(res);
            return res;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const onEditPress = (item) => {
        setForm({
            id_encierro: item.id_encierro || item.id,
            codigo_encierro: item.codigo_encierro || item.codigo || '',
        });
    };

    const onDeletePress = (item) => {
        setEncierroAEliminar(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setEncierroAEliminar(null);
    };

    const handleConfirmDelete = async () => {
        if (encierroAEliminar) {
            const id = encierroAEliminar.id || encierroAEliminar.id_encierro;
            await handleDeleteEncierro(id);
            handleCloseModal();
        }
    };

    const handleSubmit = async () => {
        if (isEditing) {
            await handleUpdateEncierro(idEdicion, form, () => {
                handleClear();
            });
        } else {
            await handleRegister();
        }
    };

    const columns = [
        {
            key: 'nombre',
            title: 'CÓDIGO',
            flex: 2,
            render: (_, item) => (
                <View style={styles?.encierroCell}>
                    <Text style={styles?.encierroName} numberOfLines={1}>
                        {item.codigo_encierro}
                    </Text>
                </View>
            ),
        },
        {
            key: 'acciones',
            title: 'ACCIONES',
            flex: 1,
            align: 'center',
            render: (_, item) => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 16,
                        maxWidth: 120, 
                        alignSelf: 'center',
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
        fetchEncierros();
    }, [fetchEncierros]);

    return {
        isMobile,
        form,
        isEditing,
        handleChange,
        handleClear,
        handleSubmit,
        modalVisible,
        encierroAEliminar,
        handleCloseModal,
        handleConfirmDelete,
        encierros,
        columns,
        loading,
        error,
        fetchEncierros,
        handleRegister,
        handleUpdateEncierro,
        handleDeleteEncierro,
    };
};