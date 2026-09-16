import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../../shared/components/Button.jsx';
import Card from '../../../shared/components/Card.jsx';
import Input from '../../../shared/components/Input.jsx';
import Select from '../../../shared/components/Select.jsx';
import DatePicker from '../../../shared/components/DatePicker.jsx';
import DataTable from '../../../shared/components/DataTable.jsx';
import Modal from '../../../shared/components/Modal.jsx';
import styleGlobal from '../../../theme/style.js';

import { useInventario } from '../hooks/useInventarios.js';
import { styles } from '../styles/inventariosStyle.js';

export default function InventarioModule() {
    const {
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
    } = useInventario(styles);

    return (
        <ScrollView
            style={styleGlobal.container}
            contentContainerStyle={styleGlobal.getContentWrapper(isMobile)}
        >
            {/* ENCABEZADO */}
            <View style={styles.headerContainer}>
                <Text style={styles.badgeCategory}>INVENTARIO</Text>
                <Text style={styles.headerTitle}>Gestión de Insumos</Text>
            </View>

            {/* FORMULARIO */}
            <Card>
                {/* FILA 1 */}
                <View style={[isMobile ? styles.colMobile : styles.row, { marginBottom: 2, zIndex: 999, elevation: 999 }]}>
                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Select
                            dense
                            label="Tipo de Insumo *"
                            labelIcon="list"
                            placeholder="Seleccione insumo"
                            options={tiposInsumoOptions}
                            value={form?.tipo}
                            onSelect={(val) => handleChange('tipo', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Select
                            dense
                            label="Unidad de Medida *"
                            labelIcon="layers"
                            placeholder="Seleccione unidad"
                            options={unidadesOptions}
                            value={form?.unidad}
                            onSelect={(val) => handleChange('unidad', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <DatePicker
                            dense
                            label="Fecha *"
                            labelIcon="calendar"
                            placeholder="AAAA-MM-DD"
                            value={form?.fecha}
                            onChange={(val) => handleChange('fecha', val)}
                        />
                    </View>
                </View>

                {/* FILA 2: Cantidad, Precio y Botones */}
                <View style={isMobile ? styles.colMobile : [styles.row, styles.alignEnd]}>
                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Input
                            dense
                            label="Cantidad *"
                            placeholder="50"
                            keyboardType="numeric"
                            value={form?.cantidad}
                            onChangeText={(val) => handleChange('cantidad', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Input
                            dense
                            label="Precio Unitario (₡) *"
                            placeholder="12500"
                            keyboardType="numeric"
                            value={form?.precio}
                            onChangeText={(val) => handleChange('precio', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.actionsMobile : styles.actionsDesktop}>
                        <Button
                            title={isEditing ? 'Cancelar' : 'Limpiar'}
                            onPress={handleClear}
                            variant="secondary"
                            icon="trash"
                        />
                        <Button
                            title={
                                loading
                                    ? 'Guardando...'
                                    : isEditing
                                    ? 'Actualizar Insumo'
                                    : 'Registrar Insumo'
                            }
                            onPress={handleSubmit}
                            variant="primary"
                            icon={isEditing ? 'pencil' : 'add'}
                            disabled={loading}
                        />
                    </View>
                </View>
            </Card>

            {/* TABLA */}
            <DataTable columns={columns} data={inventarios} />

            {/* MODAL DE ELIMINACIÓN */}
            <Modal
                visible={modalVisible}
                type="danger"
                title="¿Eliminar artículo?"
                message="¿Estás seguro de que deseas eliminar este artículo del inventario?"
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                loading={loading}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseModal}
            />
        </ScrollView>
    );
}