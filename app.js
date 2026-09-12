import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Importación modular desde la carpeta de componentes
import Avatar from './src/shared/components/Avatar';
import Badge from './src/shared/components/Badge';
import Button from './src/shared/components/Button';
import DataTable from './src/shared/components/DataTable';
import DatePicker from './src/shared/components/DatePicker';
import Input from './src/shared/components/Input';
import Select from './src/shared/components/Select';
import TimePicker from './src/shared/components/TimePicker';

export default function App() {
  // Estados usando strings ("YYYY-MM-DD" y "HH:mm") para evitar errores con .split()
  const [nombre, setNombre] = useState('');
  const [tipoAve, setTipoAve] = useState('');
  const [fecha, setFecha] = useState('2026-09-11');
  const [hora, setHora] = useState('08:30');

  // 1. DATOS Y COLUMNAS: Tabla de Encierros
  const encierrosData = [
    { id: '1', codigo: 'ENC-001', nombre: 'Galpón 01 - Tunel Alpha' },
    { id: '2', codigo: 'ENC-002', nombre: 'Galpón 02 - Tradicional Este' },
    { id: '3', codigo: 'ENC-003', nombre: 'Galpón 03 - Clima Controlado' },
    { id: '4', codigo: 'ENC-004', nombre: 'Galpón 04 - Cría & Inicio' },
  ];

  const encierrosColumns = [
    {
      key: 'nombre',
      title: 'Código / Nombre del Encierro',
      render: (_, row) => (
        <View style={styles.avatarCell}>
          <Avatar icon="home" size={38} />
          <View>
            <Text style={styles.itemTitle}>{row.nombre}</Text>
            <Text style={styles.itemCode}>{row.codigo}</Text>
          </View>
        </View>
      ),
    },
    {
      key: 'acciones',
      title: 'Acciones',
      width: 110,
      align: 'right',
      render: (_, row) => (
        <Button
          title="Editar"
          variant="secondary"
          size="small"
          icon="edit-2"
          onPress={() => console.log('Editar encierro:', row.id)}
        />
      ),
    },
  ];

  // 2. DATOS Y COLUMNAS: Tabla de Lotes y Registros
  const lotesData = [
    {
      id: '1',
      tipo: 'Gallina',
      encierro: 'Galpón 04 - Principal',
      fecha: '18 Oct 2024',
      cantidad: '8,200 aves',
      costo: '₡ 4.325.000',
      estado: 'ACTIVO',
      estadoVariant: 'success',
    },
    {
      id: '2',
      tipo: 'Pollo',
      encierro: 'Galpón 02 - Sector Sur',
      fecha: '26 Oct 2024',
      cantidad: '10,500 aves',
      costo: '₡ 5.535.000',
      estado: 'ACTIVO',
      estadoVariant: 'success',
    },
    {
      id: '3',
      tipo: 'Pollo',
      encierro: 'Galpón 06 (Liberado)',
      fecha: '15 Sep 2024',
      cantidad: '12,000 aves',
      costo: '₡ 6.330.000',
      estado: 'CONCLUIDO',
      estadoVariant: 'neutral',
    },
  ];

  const lotesColumns = [
    { key: 'tipo', title: 'Tipo de Ave', width: 90 },
    { key: 'encierro', title: 'Encierro Asociado' },
    { key: 'fecha', title: 'Fecha', width: 100 },
    { key: 'cantidad', title: 'Cantidad', width: 100 },
    {
      key: 'costo',
      title: 'Costo',
      width: 110,
      render: (val) => <Text style={styles.montoText}>{val}</Text>,
    },
    {
      key: 'estado',
      title: 'Estado',
      width: 110,
      render: (val, row) => <Badge text={val} variant={row.estadoVariant} />,
    },
    {
      key: 'acciones',
      title: 'Acciones',
      width: 130,
      align: 'right',
      render: (_, row) =>
        row.estado === 'ACTIVO' ? (
          <Button
            title="Finalizar Lote"
            variant="outline"
            size="small"
            onPress={() => console.log('Finalizar lote:', row.id)}
          />
        ) : (
          <Text style={styles.textDisabled}>CICLO CERRADO</Text>
        ),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      <ScrollView contentContainerStyle={styles.container}>

        {/* ENCABEZADO GENERAL */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Panel de Control Avicontrol</Text>
          <Text style={styles.headerSubtitle}>
            Vista previa de UI y suite de componentes
          </Text>
        </View>

        {/* BARRA DE USUARIOS CON AVATAR */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Responsables del Turno</Text>
          <View style={styles.avatarRow}>
            <Avatar name="Carlos Mendoza" size={42} />
            <Avatar name="Diego Vargas" size={42} />
            <Avatar name="Elena Ramos" size={42} />
            <Avatar name="Marcos Duarte" size={42} />
          </View>
        </View>

        {/* FORMULARIO DE PRUEBA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Registro Rápido de Encierro</Text>

          <Input
            label="Código o Nombre del Galpón"
            placeholder="Ej. Galpón 05 - Cría Alta"
            value={nombre}
            onChangeText={setNombre}
          />

          <Select
            label="Tipo de Ave Alojada"
            placeholder="Seleccionar tipo..."
            value={tipoAve}
            onSelect={setTipoAve}
            options={[
              { label: 'Gallina Ponedora', value: 'gallina' },
              { label: 'Pollo Broiler', value: 'pollo' },
            ]}
          />

          <View style={styles.rowFields}>
            <View style={styles.flex1}>
              <DatePicker
                label="Fecha de Ingreso"
                value={fecha}
                onChange={setFecha}
              />
            </View>
            <View style={styles.flex1}>
              <TimePicker
                label="Hora de Alimentación"
                value={hora}
                onChange={setHora}
              />
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <Button title="Guardar Galpón" variant="primary" onPress={() => { }} />
            <Button title="Cancelar" variant="outline" onPress={() => { }} />
          </View>
        </View>

        {/* TABLA DE ENCIERROS */}
        <DataTable
          title="Encierros Registrados"
          columns={encierrosColumns}
          data={encierrosData}
          footer={{
            totalText: 'Mostrando 4 de 8 encierros activos',
            actions: (
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Button title="Anterior" variant="outline" size="small" />
                <Button title="Siguiente" variant="secondary" size="small" />
              </View>
            ),
          }}
        />

        {/* TABLA DE LOTES CON BADGES Y ACCIONES */}
        <DataTable
          title="Resumen de Lotes de Aves"
          columns={lotesColumns}
          data={lotesData}
          footer={{
            totalText: 'Mostrando 3 registros de lotes',
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    padding: 16,
    gap: 16,
  },
  header: {
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    gap: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  avatarCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#0F172A',
  },
  itemCode: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A83200',
  },
  montoText: {
    fontWeight: '800',
    fontSize: 13,
    color: '#0F172A',
  },
  textDisabled: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
});