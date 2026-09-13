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

import { useLotes } from '../hooks/useLotes.js';
import { styles } from '../styles/lotesStyle.js';

export default function LotesModule() {
    const {
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
    } = useLotes(styles);

    return (
        <ScrollView
            style={styleGlobal.container}
            contentContainerStyle={styleGlobal.getContentWrapper(isMobile)}
        >
            {/* ENCABEZADO */}
            <View style={styles.headerContainer}>
                <Text style={styles.badgeCategory}>PRODUCCIÓN</Text>
                <Text style={styles.headerTitle}>Gestión de Lotes</Text>
            </View>

            {/* FORMULARIO */}
            <Card>
                {/* FILA 1 */}
                <View style={[isMobile ? styles.colMobile : styles.row, { marginBottom: 2, zIndex: 999, elevation: 999 }]}>
                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Select
                            dense
                            label="Tipo de Ave *"
                            labelIcon="list"
                            placeholder="Seleccione tipo de ave"
                            options={tiposDeAvesOptions}
                            value={form?.tipo_ave}
                            onSelect={(val) => handleChange('tipo_ave', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Select
                            dense
                            label="Encierro Asociado *"
                            labelIcon="home"
                            placeholder="Seleccione un encierro"
                            options={encierrosOptions}
                            value={form?.encierro_id}
                            onSelect={(val) => handleChange('encierro_id', val)}
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

                {/* FILA 2: Cantidad, Costo y Botones */}
                <View style={isMobile ? styles.colMobile : [styles.row, styles.alignEnd]}>
                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Input
                            dense
                            label="Cantidad de Aves *"
                            placeholder="3500"
                            keyboardType="numeric"
                            value={form?.cantidad_aves}
                            onChangeText={(val) => handleChange('cantidad_aves', val)}
                        />
                    </View>

                    <View style={isMobile ? styles.itemMobile : styles.col3}>
                        <Input
                            dense
                            label="Costo Total (₡) *"
                            placeholder="1850000"
                            keyboardType="numeric"
                            value={form?.costo_total}
                            onChangeText={(val) => handleChange('costo_total', val)}
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
                                        ? 'Actualizar Lote'
                                        : 'Registrar Lote'
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
            <DataTable columns={columns} data={lotes} />

            {/* MODAL */}
            <Modal
                visible={modalVisible}
                type="danger"
                title="¿Eliminar lote?"
                message="¿Estás seguro de que deseas eliminar este lote?"
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                loading={loading}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseModal}
            />
        </ScrollView>
    );
}