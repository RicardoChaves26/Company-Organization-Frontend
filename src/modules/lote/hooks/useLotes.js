import { useState, useEffect } from 'react';
import { useWindowDimensions, View, Text } from 'react-native';
import colors from '../../../theme/colors.js';
import Icon from '../../../theme/icons.js';
import Button from '../../../shared/components/Button.jsx';
import { getLotes, createLote, updateLote, deleteLote, finalizeLote } from '../services/lotesService.js';
import { getEncierros } from '../../encierros/services/encierrosService.js';

export function useLotes(styles) {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [lotes, setLotes] = useState([]);
    const [encierrosOptions, setEncierrosOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [loteAEliminar, setLoteAEliminar] = useState(null);

    const [form, setForm] = useState({
        tipo_ave: '',
        encierro_id: '',
        fecha: '',
        cantidad_aves: '',
        costo_total: '',
    });

    const tiposDeAvesOptions = [
        { label: 'Gallina', value: 'Gallina' },
        { label: 'Pollo', value: 'Pollo' },
    ];

    const fetchData = async () => {
        try {
            setLoading(true);
            const [lotesData, encierrosData] = await Promise.all([
                getLotes(),
                getEncierros(),
            ]);

            const encierrosList = encierrosData || [];

            // 1. Crear un mapa para buscar el código del encierro rápidamente por su ID
            const encierrosMap = {};
            encierrosList.forEach((encierro) => {
                encierrosMap[encierro.id] = encierro.codigo_encierro;
            });

            // 2. Inyectar el código del encierro a cada lote si no viene incluido
            const lotesEnriquecidos = (lotesData || []).map((lote) => ({
                ...lote,
                codigo_encierro: lote.codigo_encierro || encierrosMap[lote.encierro_id] || `ID: ${lote.encierro_id}`,
            }));

            const encierrosFormatted = encierrosList.map((encierro) => ({
                label: encierro.codigo_encierro,
                value: encierro.id,
            }));

            setLotes(lotesEnriquecidos);
            setEncierrosOptions(encierrosFormatted);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClear = () => {
        setForm({
            tipo_ave: '',
            encierro_id: '',
            fecha: '',
            cantidad_aves: '',
            costo_total: '',
        });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = async () => {
        if (!form.tipo_ave || !form.encierro_id || !form.fecha || !form.cantidad_aves || !form.costo_total) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        const payload = {
            tipo: form.tipo_ave,
            encierro_id: Number(form.encierro_id),
            fecha: form.fecha,
            cantidad: Number(form.cantidad_aves),
            precio: Number(form.costo_total),
        };

        try {
            setLoading(true);
            if (isEditing) {
                await updateLote(currentId, payload);
            } else {
                await createLote(payload);
            }
            handleClear();
            fetchData();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onEditPress = (item) => {
        setIsEditing(true);
        setCurrentId(item.id);
        setForm({
            tipo_ave: item.tipo,
            encierro_id: item.encierro_id,
            fecha: item.fecha ? item.fecha.split('T')[0] : '',
            cantidad_aves: String(item.cantidad),
            costo_total: String(item.precio),
        });
    };

    const onDeletePress = (item) => {
        setLoteAEliminar(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setLoteAEliminar(null);
    };

    const handleConfirmDelete = async () => {
        if (!loteAEliminar) return;
        try {
            setLoading(true);
            await deleteLote(loteAEliminar.id);
            handleCloseModal();
            fetchData();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFinalizePress = async (item) => {
        try {
            setLoading(true);
            await finalizeLote(item.id);
            fetchData();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: 'tipo_ave',
            title: 'TIPO DE AVE',
            flex: 1.2,
            render: (_, item) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontWeight: '700', color: colors.textHeadline }}>{item.tipo}</Text>
                </View>
            ),
        },
        {
            key: 'encierro',
            title: 'ENCIERRO ASOCIADO',
            flex: 1.8,
            render: (_, item) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Icon name="home" size={16} color={colors.textMuted} />
                    <Text style={{ color: colors.textHeadline, fontWeight: '500' }} numberOfLines={1}>
                        {item.codigo_encierro}
                    </Text>
                </View>
            ),
        },
        {
            key: 'fecha',
            title: 'FECHA',
            flex: 1.2,
            render: (_, item) => <Text style={{ color: colors.textMuted }}>{item.fecha?.split('T')[0]}</Text>,
        },
        {
            key: 'cantidad_aves',
            title: 'CANTIDAD DE AVES',
            flex: 1.2,
            render: (_, item) => <Text style={{ fontWeight: '600', color: colors.textHeadline }}>{item.cantidad} aves</Text>,
        },
        {
            key: 'costo_total',
            title: 'COSTO (₡)',
            flex: 1.2,
            render: (_, item) => <Text style={{ fontWeight: '700', color: colors.textHeadline }}>₡ {item.precio}</Text>,
        },
        {
            key: 'estado',
            title: 'ESTADO',
            flex: 1,
            render: (_, item) => (
                <Text style={{ fontWeight: '700', color: item.finalizado ? colors.textMuted : colors.iconBackgroundGreen, fontSize: 11 }}>
                    {item.finalizado ? '● FINALIZADO' : '● ACTIVO'}
                </Text>
            ),
        },
        {
            key: 'acciones',
            title: 'ACCIONES',
            flex: 1.2,
            align: 'center',
            render: (_, item) => (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                    {!item.finalizado ? (
                        <Button
                            variant=""
                            icon="check" 
                            dense
                            onPress={() => handleFinalizePress(item)}
                        />
                    ) : (
                        <View style={{ width: 32 }} />
                    )}
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

    return {
        isMobile,
        form,
        isEditing,
        lotes,
        columns,
        loading,
        modalVisible,
        loteAEliminar,
        encierrosOptions,
        tiposDeAvesOptions,
        handleChange,
        handleClear,
        handleSubmit,
        handleCloseModal,
        handleConfirmDelete,
    };
}