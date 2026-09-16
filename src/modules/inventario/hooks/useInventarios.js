import { useState, useEffect } from 'react';
import { useWindowDimensions, View, Text } from 'react-native';
import colors from '../../../theme/colors.js';
import Icon from '../../../theme/icons.js';
import Button from '../../../shared/components/Button.jsx';
import { 
    getInventarios, 
    createInventario, 
    updateInventario, 
    deleteInventario 
} from '../services/inventariosService.js';

export function useInventario(styles) {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const [inventarios, setInventarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [itemAEliminar, setItemAEliminar] = useState(null);

    const [form, setForm] = useState({
        fecha: '',
        tipo: '',
        unidad: '',
        cantidad: '',
        precio: '',
    });

    const tiposInsumoOptions = [
        { label: 'Alimento Inicio Pollo', value: 'Alimento Inicio Pollo' },
        { label: 'Alimento Engorde Pollo', value: 'Alimento Engorde Pollo' },
        { label: 'Alimento Maiz Quebrado', value: 'Alimento Maiz Quebrado' },
        { label: 'Alimento Inicio Gallina', value: 'Alimento Inicio Gallina' },
        { label: 'Melaza en polvo', value: 'Melaza en polvo' },
        { label: 'Calcio Granulado', value: 'Calcio Granulado' },
        { label: 'Desparacitantes', value: 'Desparacitantes' },
        { label: 'Vitamina', value: 'Vitamina' },
        { label: 'Emicina', value: 'Emicina' },

        { label: 'Sacos Burrucha', value: 'Sacos Burrucha' },
    ];

    const unidadesOptions = [
        { label: 'Kilogramos (Kg)', value: 'Kg' },
        { label: 'Sobres', value: 'sobres' },
        { label: 'Mililitros (ml)', value: 'ml' },
        { label: 'Litros (L)', value: 'L' },
        { label: 'Sacos', value: 'sacos' },
    ];

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getInventarios();
            const inventariosList = data || [];
            setInventarios(inventariosList);
        } catch (error) {
            console.error('Error al obtener inventario:', error);
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
            fecha: '',
            tipo: '',
            unidad: '',
            cantidad: '',
            precio: '',
        });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = async () => {
        if (!form.fecha || !form.tipo || !form.unidad || !form.cantidad || !form.precio) {
            alert('Por favor complete todos los campos obligatorios.');
            return;
        }

        const payload = {
            fecha: form.fecha,
            tipo: form.tipo,
            unidad: form.unidad,
            cantidad: Number(form.cantidad),
            precio: Number(form.precio),
        };

        try {
            setLoading(true);
            if (isEditing) {
                await updateInventario(currentId, payload);
            } else {
                await createInventario(payload);
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
            fecha: item.fecha ? item.fecha.split('T')[0] : '',
            tipo: item.tipo,
            unidad: item.unidad,
            cantidad: String(item.cantidad),
            precio: String(item.precio),
        });
    };

    const onDeletePress = (item) => {
        setItemAEliminar(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setItemAEliminar(null);
    };

    const handleConfirmDelete = async () => {
        if (!itemAEliminar) return;
        try {
            setLoading(true);
            await deleteInventario(itemAEliminar.id);
            handleCloseModal();
            fetchData();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: 'codigo',
            title: 'CÓDIGO',
            flex: 1,
            render: (_, item) => (
                <Text style={{ fontWeight: '700', color: '#D97706' }}>
                    {item.id}
                </Text>
            ),
        },
        {
            key: 'fecha',
            title: 'FECHA',
            flex: 1.2,
            render: (_, item) => <Text style={{ color: colors.textMuted }}>{item.fecha?.split('T')[0]}</Text>,
        },
        {
            key: 'tipo_insumo',
            title: 'TIPO DE INSUMO',
            flex: 1.8,
            render: (_, item) => (
                <View style={{ flexDirection: 'column', gap: 2 }}>
                    <Text style={{ fontWeight: '700', color: colors.textHeadline }} numberOfLines={1}>
                        {item.tipo}
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.textMuted }}>Insumo General</Text>
                </View>
            ),
        },
        {
            key: 'cantidad_unidad',
            title: 'CANTIDAD Y UNIDAD',
            flex: 1.3,
            render: (_, item) => (
                <Text style={{ fontWeight: '600', color: colors.textHeadline }}>
                    {item.cantidad} {item.unidad}
                </Text>
            ),
        },
        {
            key: 'precio_unitario',
            title: 'PRECIO UNITARIO',
            flex: 1.2,
            render: (_, item) => (
                <Text style={{ fontWeight: '700', color: colors.textHeadline }}>
                    ₡ {Number(item.precio).toLocaleString()}
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
        inventarios,
        columns,
        loading,
        modalVisible,
        itemAEliminar,
        tiposInsumoOptions,
        unidadesOptions,
        handleChange,
        handleClear,
        handleSubmit,
        handleCloseModal,
        handleConfirmDelete,
    };
}