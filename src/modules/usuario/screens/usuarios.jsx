import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Button from '../../../shared/components/Button.jsx';
import Card from '../../../shared/components/Card.jsx';
import Input from '../../../shared/components/Input.jsx';
import DataTable from '../../../shared/components/DataTable.jsx';
import Modal from '../../../shared/components/Modal.jsx';
import styleGlobal from '../../../theme/style.js';

import { useUsuarios } from '../hooks/useUsuarios.js';
import { styles } from '../styles/usuariosStyle.js';

export default function Usuarios() {
  const {
    isMobile,
    form,
    isEditing,
    usuarios,
    columns,
    loading,
    modalVisible,
    usuarioAEliminar,
    handleChange,
    handleClear,
    handleSubmit,
    handleCloseModal,
    handleConfirmDelete,
  } = useUsuarios(styles);

  return (
    <ScrollView
      style={styleGlobal.container}
      contentContainerStyle={styleGlobal.getContentWrapper(isMobile)}
    >
      {/* ENCABEZADO */}
      <View style={styles.headerContainer}>
        <Text style={styles.badgeCategory}>ADMINISTRACIÓN</Text>
        <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
      </View>

      {/* FORMULARIO */}
      <Card>
        {/* FILA 1: 3 INPUTS */}
        <View style={isMobile ? styles.colMobile : styles.row}>
          <View style={isMobile ? styles.itemMobile : styles.col3}>
            <Input
              dense
              label="Nombre Completo *"
              placeholder="Carlos Mendoza Solano"
              value={form?.nombre}
              onChangeText={(val) => handleChange('nombre', val)}
            />
          </View>

          <View style={isMobile ? styles.itemMobile : styles.col3}>
            <Input
              dense
              label="Teléfono *"
              placeholder="+506 8844-2211"
              keyboardType="phone-pad"
              value={form?.telefono}
              onChangeText={(val) => handleChange('telefono', val)}
            />
          </View>

          <View style={isMobile ? styles.itemMobile : styles.col3}>
            <Input
              dense
              label="Correo Electrónico *"
              placeholder="c.mendoza@santaclara.cr"
              keyboardType="email-address"
              value={form?.correo}
              onChangeText={(val) => handleChange('correo', val)}
            />
          </View>
        </View>

        {/* FILA 2: 2 INPUTS + BOTONES ALINEADOS */}
        <View style={isMobile ? styles.colMobile : [styles.row, styles.alignEnd]}>
          <View style={isMobile ? styles.itemMobile : styles.col3}>
            <Input
              dense
              label="Usuario (Login ID) *"
              placeholder="cmendoza"
              value={form?.usuario}
              onChangeText={(val) => handleChange('usuario', val)}
            />
          </View>

          <View style={isMobile ? styles.itemMobile : styles.col3}>
            <Input
              dense
              label={isEditing ? 'Nueva Contraseña (Opcional)' : 'Contraseña *'}
              placeholder="••••••••"
              secureTextEntry
              value={form?.password}
              onChangeText={(val) => handleChange('password', val)}
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
                  ? 'Actualizar Usuario'
                  : 'Registrar Usuario'
              }
              onPress={handleSubmit}
              variant="primary"
              icon={isEditing ? 'pencil' : 'add'}
              disabled={loading}
            />
          </View>
        </View>
      </Card>

      {/* TABLA RESPONSIVA */}
      <DataTable columns={columns} data={usuarios} />

      {/* MODAL REUTILIZABLE INTEGRADO */}
      <Modal
        visible={modalVisible}
        type="danger"
        title="¿Eliminar usuario?"
        message={`¿Estás seguro de que deseas eliminar a "${usuarioAEliminar?.nombre || 'este usuario'}"?`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseModal}
      />
    </ScrollView>
  );
}