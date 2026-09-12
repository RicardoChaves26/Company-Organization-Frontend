import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../theme/colors.js';
import Icon from '../../theme/icons.js';

export default function CustomTimePicker({
    label,
    labelIcon,
    value,
    onChange,
    placeholder = 'HH:mm',
    disabled = false,
    style,
}) {
    const inputRef = useRef(null);
    const [showPickerNative, setShowPickerNative] = useState(false);

    const parseStringToTimeDate = (timeStr) => {
        const now = new Date();
        if (!timeStr) return now;
        const parts = timeStr.split(':');
        if (parts.length >= 2) {
            now.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
        }
        return now;
    };

    const formatTimeTo24h = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDisplayTime = (timeStr) => {
        if (!timeStr) return '';
        const parts = timeStr.split(':');
        if (parts.length >= 2) {
            let hours = parseInt(parts[0], 10);
            const minutes = parts[1];
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const formattedHours = String(hours).padStart(2, '0');
            return `${formattedHours}:${minutes} ${ampm}`;
        }
        return timeStr;
    };

    const handlePressCard = () => {
        if (disabled) return;

        if (Platform.OS === 'web') {
            if (inputRef.current && 'showPicker' in HTMLInputElement.prototype) {
                try {
                    inputRef.current.showPicker();
                } catch (e) {
                    setShowPickerNative(true);
                }
            } else {
                setShowPickerNative(true);
            }
        } else {

            setShowPickerNative(true);
        }
    };

    const handleNativeTimeChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowPickerNative(false);
        }

        if (event.type === 'set' && selectedDate) {
            const formatted = formatTimeTo24h(selectedDate);
            if (onChange) onChange(formatted);
        } else if (event.type === 'dismissed') {
            setShowPickerNative(false);
        }
    };

    return (
        <View style={[styles.container, style]}>
            {/* 1. Encabezado / Label */}
            {label && (
                <View style={styles.labelRow}>
                    {labelIcon && (
                        <Icon
                            name={labelIcon}
                            size={18}
                            color={colors.primary || '#FF6B00'}
                            style={styles.labelIconStyle}
                        />
                    )}
                    <Text style={styles.label}>{label}</Text>
                </View>
            )}

            {/* 2. Tarjeta Táctil */}
            <View style={styles.cardWrapper}>
                <TouchableOpacity
                    style={[styles.timeCard, disabled && styles.disabledCard]}
                    activeOpacity={0.7}
                    disabled={disabled}
                    onPress={handlePressCard}
                >
                    <Text
                        style={[styles.timeText, !value && styles.placeholderText]}
                        numberOfLines={1}
                    >
                        {value ? formatDisplayTime(value) : placeholder}
                    </Text>

                    <Icon
                        name="clock"
                        size={20}
                        color={colors.textHeadline || '#1A1D1E'}
                        style={styles.rightIconStyle}
                    />
                </TouchableOpacity>

                {/* Input Oculto para Navegador Web */}
                {Platform.OS === 'web' && (
                    <input
                        ref={inputRef}
                        type="time"
                        value={value || ''}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        disabled={disabled}
                        style={styles.hiddenWebInput}
                    />
                )}
            </View>

            {/* 3. Selector Nativo de Hora (Móvil) */}
            {showPickerNative && Platform.OS !== 'web' && (
                <DateTimePicker
                    value={parseStringToTimeDate(value)}
                    mode="time"
                    is24Hour={false}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleNativeTimeChange}
                />
            )}
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
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    labelIconStyle: {
        marginRight: 6,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textHeadline,
    },
    cardWrapper: {
        position: 'relative',
        width: '100%',
    },
    timeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        paddingHorizontal: 20,
        height: 64,
    },
    disabledCard: {
        opacity: 0.6,
    },
    timeText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: colors.textHeadline,
    },
    placeholderText: {
        color: colors.textMuted,
        fontWeight: '400',
    },
    rightIconStyle: {
        marginLeft: 14,
    },
    hiddenWebInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: 'none',
    },
});

{/* <CustomTimePicker
    label="Hora de Registro"
    labelIcon="clock"
    value={hora}
    onChange={(nuevaHora) => setHora(nuevaHora)}
    placeholder="Seleccione la hora"
/> */}