import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import colors from '../../theme/colors.js';
import Icon from '../../theme/icons.js';

export default function CustomInput({
  label,
  rightLabel,
  rightLabelColor = colors.primary,
  leftIcon,
  rightIcon,
  prefix,

  isButton = false,
  isNumeric = false,
  isDecimal = false,

  onPress,
  style,
  inputStyle,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  editable = true,
  ...props
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);
  const isClickable = isButton || !!onPress;
  const Wrapper = isClickable ? TouchableOpacity : View;

  const handleChangeText = (text) => {
    if (!onChangeText) return;

    if (isNumeric) {
      onChangeText(text.replace(/[^0-9]/g, ''));
    } else if (isDecimal) {
      let cleanText = text.replace(/[^0-9.]/g, '');
      const parts = cleanText.split('.');
      if (parts.length > 2) {
        cleanText = `${parts[0]}.${parts.slice(1).join('')}`;
      }
      onChangeText(cleanText);
    } else {
      onChangeText(text);
    }
  };

  const computedKeyboardType = isNumeric
    ? 'numeric'
    : isDecimal
      ? 'decimal-pad'
      : keyboardType;

  return (
    <View style={[styles.container, style]}>
      {/* 1. Encabezado / Labels */}
      {(label || rightLabel) && (
        <View style={styles.labelRow}>
          {label ? <Text style={styles.label}>{label}</Text> : <View />}
          {rightLabel ? (
            <Text style={[styles.rightLabel, { color: rightLabelColor }]}>
              {rightLabel}
            </Text>
          ) : null}
        </View>
      )}

      {/* 2. Caja del Input */}
      <Wrapper
        style={[styles.inputCard, !editable && styles.disabledCard]}
        onPress={isClickable ? onPress : undefined}
        activeOpacity={0.7}
      >
        {/* Ícono Izquierdo */}
        {leftIcon && <Icon name={leftIcon} style={styles.leftIconStyle} />}

        {/* Prefijo (Ejemplo: $) */}
        {prefix && <Text style={styles.prefixText}>{prefix}</Text>}

        {/* Campo Táctil o Input de Texto */}
        {isClickable ? (
          <Text style={[styles.inputText, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>
        ) : (
          <TextInput
            style={[styles.inputText, inputStyle]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            keyboardType={computedKeyboardType}
            secureTextEntry={isPasswordHidden}
            editable={editable}
            {...props}
          />
        )}

        {/* Ícono Derecho / Ojito de Contraseña */}
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            activeOpacity={0.6}
          >
            <Icon
              name={isPasswordHidden ? 'eye' : 'eyeOff'}
              style={styles.rightIconStyle}
            />
          </TouchableOpacity>
        ) : (
          rightIcon && <Icon name={rightIcon} style={styles.rightIconStyle} />
        )}
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textHeadline,
  },
  rightLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 64, 
  },
  disabledCard: {
    opacity: 0.6,
  },
  prefixText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textHeadline,
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textHeadline,
    height: '100%',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        borderWidth: 0,
      },
    }),
  },
  placeholderText: {
    color: colors.textMuted,
    fontWeight: '400',
  },
  leftIconStyle: {
    marginRight: 14,
  },
  rightIconStyle: {
    marginLeft: 14,
  },
});

{/* <CustomInput
  label="Contraseña"
  placeholder="••••••••"
  leftIcon="lock"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/> */}