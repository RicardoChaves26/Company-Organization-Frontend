import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './Button.jsx';
import colors from '../../theme/colors.js';

export default function CustomModal({
  visible = false,
  type = 'danger', // 'danger' | 'warning' | 'info' | 'success'
  title = '¿Confirmar acción?',
  message = '',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  loading = false,
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bgColor: '#FEF3C7',
          iconName: 'warning-outline',
          iconColor: '#D97706',
          btnVariant: 'warning',
        };
      case 'info':
        return {
          bgColor: '#E0F2FE',
          iconName: 'information-circle-outline',
          iconColor: '#0284C7',
          btnVariant: 'primary',
        };
      case 'success':
        return {
          bgColor: '#DCFCE7',
          iconName: 'checkmark-circle-outline',
          iconColor: '#16A34A',
          btnVariant: 'success',
        };
      case 'danger':
      default:
        return {
          bgColor: '#FEE2E2',
          iconName: 'trash-outline',
          iconColor: '#DC2626',
          btnVariant: 'danger',
        };
    }
  };

  const config = getTypeStyles();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable 
          style={[
            styles.modalCard, 
            { width: isMobile ? '90%' : 380 }
          ]}
        >
          {/* ICONO CABECERA */}
          <View style={[styles.iconContainer, { backgroundColor: config.bgColor }]}>
            <Ionicons name={config.iconName} size={28} color={config.iconColor} />
          </View>

          {/* TITULO Y MENSAJE */}
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          {/* BOTONES DE ACCIÓN */}
          <View style={isMobile ? styles.actionsMobile : styles.actionsDesktop}>
            <View style={styles.btnWrapper}>
              <Button
                title={cancelText}
                variant="secondary"
                onPress={onCancel}
                disabled={loading}
                style={{ width: '100%' }} // 👈 Forzar ancho completo
                fullWidth
              />
            </View>
            <View style={styles.btnWrapper}>
              <Button
                title={loading ? 'Procesando...' : confirmText}
                variant={config.btnVariant}
                onPress={onConfirm}
                disabled={loading}
                style={{ width: '100%' }} // 👈 Forzar ancho completo
                fullWidth
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeadline || '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: colors.textMuted || '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  actionsDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  actionsMobile: {
    flexDirection: 'column-reverse',
    gap: 10,
    width: '100%',
  },
  btnWrapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});