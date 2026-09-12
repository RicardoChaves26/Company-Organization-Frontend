import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import colors from '../../theme/colors.js';
import Icon from '../../theme/icons.js';

export default function CustomButton({
    title,
    onPress,
    variant = 'primary',
    size = 'normal',
    icon,
    fullWidth = false,
    loading = false,
    disabled = false,
    active = false,
    style,
}) {

    const getContainerStyles = () => {
        const base = [styles.buttonBase];

        if (size === 'small') base.push(styles.sizeSmall);
        else base.push(styles.sizeNormal);

        if (variant === 'primary') {
            base.push(styles.btnPrimary);
        } else if (variant === 'secondary') {
            base.push(styles.btnSecondary);
        } else if (variant === 'filter') {
            base.push(active ? styles.btnFilterActive : styles.btnFilterInactive);
        }

        if (fullWidth) base.push(styles.fullWidth);
        if (disabled || loading) base.push(styles.disabled);

        return base;
    };

    const getTextStyles = () => {
        const base = [styles.textBase];

        if (size === 'small') base.push(styles.textSmall);

        if (variant === 'primary') {
            base.push(styles.textPrimary);
        } else if (variant === 'secondary') {
            base.push(styles.textSecondary);
        } else if (variant === 'filter') {
            base.push(active ? styles.textFilterActive : styles.textFilterInactive);
        }

        return base;
    };

    const getIconColor = () => {
        if (variant === 'primary') return '#FFFFFF';
        if (variant === 'filter') return active ? '#FFFFFF' : colors.textHeadline || '#1A1D1E';
        return colors.textHeadline || '#1A1D1E';
    };

    return (
        <TouchableOpacity
            style={[getContainerStyles(), style]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? '#FFFFFF' : colors.primary || '#C0392B'}
                />
            ) : (
                <View style={styles.contentRow}>
                    {icon && (
                        <Icon
                            name={icon}
                            size={size === 'small' ? 16 : 18}
                            color={getIconColor()}
                            style={styles.iconStyle}
                        />
                    )}
                    {title && <Text style={getTextStyles()}>{title}</Text>}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
        borderRadius: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    fullWidth: {
        width: '100%',
        alignSelf: 'stretch',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        marginRight: 8,
    },

    sizeNormal: {
        height: 52,
        paddingHorizontal: 24,
    },
    sizeSmall: {
        height: 38,
        paddingHorizontal: 18,
    },

    btnPrimary: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    btnSecondary: {
        backgroundColor: colors.cardBackground,
    },
    btnFilterActive: {
        backgroundColor: colors.primary,
    },
    btnFilterInactive: {
        backgroundColor: colors.cardBackground,
    },

    textBase: {
        fontSize: 15,
        fontWeight: '700',
    },
    textSmall: {
        fontSize: 13,
        fontWeight: '600',
    },
    textPrimary: {
        color: '#FFFFFF',
    },
    textSecondary: {
        color: colors.textHeadline,
    },
    textFilterActive: {
        color: '#FFFFFF',
    },
    textFilterInactive: {
        color: colors.textHeadline,
    },

    disabled: {
        opacity: 0.6,
    },
});

{/* <CustomButton
    title="Agregar Usuario"
    variant="primary"
    icon="add"
    onPress={handleRegistrar}
    style={{ flex: 2 }}
/> */}