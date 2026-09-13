import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../../shared/components/Button.jsx';
import Card from '../../../shared/components/Card.jsx';
import Input from '../../../shared/components/Input.jsx';
import DataTable from '../../../shared/components/DataTable.jsx';
import Modal from '../../../shared/components/Modal.jsx';
import styleGlobal from '../../../theme/style.js';

import { useEncierros } from '../hooks/useEncierros.js';
import { styles } from '../styles/encierrosStyle.js';

export default function EncierroModule() {
    const {
        isMobile,
        form,
        isEditing,
        encierros,
        columns,
        loading,
        modalVisible,
        encierroAEliminar,
        handleChange,
        handleClear,
        handleSubmit,
        handleCloseModal,
        handleConfirmDelete,
    } = useEncierros(styles);

    return (
        <ScrollView
            style={styleGlobal.container}
            contentContainerStyle={styleGlobal.getContentWrapper(isMobile)}
        >
            {/* ENCABEZADO */}
            <View style={styles.headerContainer}>
                <Text style={styles.badgeCategory}>ADMINISTRACIÓN</Text>
                <Text style={styles.headerTitle}>Gestión de Encierros</Text>
            </View>

            {/* FORMULARIO */}
            <Card>
                <View style={isMobile ? styles.colMobile : [styles.row, styles.alignEnd]}>
                    <View style={isMobile ? styles.itemMobile : styles.colFlex}>
                        <Input
                            dense
                            label="Código de Encierro / Nombre *"
                            placeholder="# Galpón 09 - Engorde Norte"
                            value={form?.codigo_encierro}
                            onChangeText={(val) => handleChange('codigo_encierro', val)}
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
                                    ? 'Actualizar Encierro'
                                    : 'Guardar Encierro'
                            }
                            onPress={handleSubmit}
                            variant="primary"
                            icon={isEditing ? 'pencil' : 'add'}
                            disabled={loading}
                        />
                    </View>
                </View>
            </Card>

            {/* TABLA DE GALPONES */}
            <View style={styles.tableHeaderSection}>
                <Text style={styles.tableSectionTitle}>Galpones Registrados</Text>
            </View>

            <DataTable columns={columns} data={encierros} />

            {/* MODAL DE ELIMINACIÓN */}
            <Modal
                visible={modalVisible}
                type="danger"
                title="¿Eliminar encierro?"
                message={`¿Estás seguro de que deseas eliminar a "${encierroAEliminar?.codigo_encierro || 'este encierro'}"?`}
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                loading={loading}
                onConfirm={handleConfirmDelete}
                onCancel={handleCloseModal}
            />
        </ScrollView>
    );
}