import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Modal, Pressable } from 'react-native';
import colors from '../../theme/colors.js';
import Icon from '../../theme/icons.js';

export default function CustomSelect({
    label,
    labelIcon,
    value,
    options = [],
    onSelect,
    placeholder = 'Seleccione una opción',
    rightIcon = 'chevronDown',
    disabled = false,
    loading = false,
    style,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const selectCardRef = useRef(null);

    const formattedOptions = options.map((opt) =>
        typeof opt === 'object'
            ? { label: opt.label || opt.nombre || opt.description, value: opt.value || opt.id }
            : { label: opt, value: opt }
    );

    const selectedOption = formattedOptions.find(
        (opt) => opt.value === value || opt.label === value
    );

    const handleSelectOption = (item) => {
        if (onSelect) onSelect(item.value, item);
        setIsOpen(false);
    };

    const openSelect = () => {
        if (disabled) return;

        if (Platform.OS !== 'web' && selectCardRef.current?.measureInWindow) {
            selectCardRef.current.measureInWindow((x, y, width, height) => {
                setDropdownPosition({ top: y + height + 4, left: x, width });
                setIsOpen(true);
            });
            return;
        }

        setIsOpen(true);
    };

    const renderOptions = () => (
        formattedOptions.length === 0 ? (
            <View style={styles.emptyItem}>
                <Text style={styles.placeholderText}>No hay opciones disponibles</Text>
            </View>
        ) : (
            formattedOptions.map((item, index) => {
                const isSelected = selectedOption && selectedOption.value === item.value;
                return (
                    <TouchableOpacity
                        key={item.value?.toString() || index.toString()}
                        style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                        onPress={() => handleSelectOption(item)}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                            {item.label}
                        </Text>
                        {isSelected && <Icon name="check" size={18} color={colors.primary} />}
                    </TouchableOpacity>
                );
            })
        )
    );

    return (
        <View style={[styles.container, style, { zIndex: isOpen ? 9999 : 1, elevation: isOpen ? 999 : 1 }]}>
            {/* 1. Encabezado del Select */}
            {label && (
                <View style={styles.labelRow}>
                    {labelIcon && <Icon name={labelIcon} size={18} color={colors.primary} style={styles.labelIconStyle} />}
                    <Text style={styles.label}>{label}</Text>
                </View>
            )}

            {/* 2. Caja del Input Select */}
            <TouchableOpacity
                ref={selectCardRef}
                style={[styles.selectCard, disabled && styles.disabledCard]}
                onPress={() => isOpen ? setIsOpen(false) : openSelect()}
                activeOpacity={0.7}
                disabled={disabled}
            >
                <Text
                    style={[styles.selectText, !selectedOption && styles.placeholderText]}
                    numberOfLines={1}
                >
                    {loading ? 'Cargando opciones...' : selectedOption ? selectedOption.label : placeholder}
                </Text>

                <Icon
                    name={isOpen ? 'chevronUp' : rightIcon}
                    size={20}
                    color={colors.textHeadline}
                    style={styles.rightIconStyle}
                />
            </TouchableOpacity>

            {/* 3. Menú Desplegable Flotante Hacia Abajo */}
            {isOpen && (
                Platform.OS === 'web' ? (
                    <View style={styles.dropdownMenu}>
                        <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled" style={styles.scrollList}>
                            {renderOptions()}
                        </ScrollView>
                    </View>
                ) : (
                    <Modal transparent visible onRequestClose={() => setIsOpen(false)}>
                        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
                            <View
                                style={[
                                    styles.dropdownMenu,
                                    styles.nativeDropdownMenu,
                                    {
                                        top: dropdownPosition.top,
                                        left: dropdownPosition.left,
                                        width: dropdownPosition.width,
                                    },
                                ]}
                                onStartShouldSetResponder={() => true}
                            >
                                <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollList}>
                                    {renderOptions()}
                                </ScrollView>
                            </View>
                        </Pressable>
                    </Modal>
                )
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
        position: 'relative',
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
    selectCard: {
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
    selectText: {
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

    dropdownMenu: {
        position: 'absolute',
        top: 96,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderRadius: 16,
        maxHeight: 220,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 999,
        zIndex: 9999,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.cardBackground,
    },
    nativeDropdownMenu: {
        position: 'absolute',
        maxHeight: 220,
    },
    modalOverlay: {
        flex: 1,
    },
    scrollList: {
        paddingVertical: 6,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 18,
    },
    optionItemSelected: {
        backgroundColor: colors.cardBackground,
    },
    emptyItem: {
        padding: 16,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.textHeadline,
    },
    optionTextSelected: {
        fontWeight: '700',
        color: colors.primary,
    },
});