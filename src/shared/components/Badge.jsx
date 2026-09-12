import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';

export default function Badge({
    text,
    variant = 'success',
    size = 'medium',
    style,
}) {

    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
            case 'activo':
            case 'Activo':
                return {
                    container: styles.bgSuccess,
                    text: styles.textSuccess,
                };
            case 'inactive':
            case 'inactivo':
            case 'Inactivo':
                return {
                    container: styles.bgInactive,
                    text: styles.textInactive,
                };
            case 'warning':
            case 'pendiente':
                return {
                    container: styles.bgWarning,
                    text: styles.textWarning,
                };
            case 'danger':
            case 'error':
                return {
                    container: styles.bgDanger,
                    text: styles.textDanger,
                };
            default:
                return {
                    container: styles.bgSuccess,
                    text: styles.textSuccess,
                };
        }
    };

    const selectedVariant = getVariantStyles();

    return (
        <View
            style={[
                styles.containerBase,
                size === 'small' ? styles.sizeSmall : styles.sizeMedium,
                selectedVariant.container,
                style,
            ]}
        >
            <Text
                style={[
                    styles.textBase,
                    size === 'small' ? styles.fontSmall : styles.fontMedium,
                    selectedVariant.text,
                ]}
            >
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBase: {
        borderRadius: 50,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sizeMedium: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        minWidth: 64,
    },
    sizeSmall: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 50,
    },

    textBase: {
        fontWeight: '600',
        textAlign: 'center',
    },
    fontMedium: {
        fontSize: 13,
    },
    fontSmall: {
        fontSize: 11,
    },

    bgSuccess: {
        backgroundColor: colors.cardBackground,
    },
    textSuccess: {
        color: colors.tertiary,
    },

    bgInactive: {
        backgroundColor: colors.buttonSecondary,
    },
    textInactive: {
        color: colors.textMuted,
    },

    bgWarning: {
        backgroundColor: '#FEF0C7',
    },
    textWarning: {
        color: colors.buttonPrimary,
    },

    bgDanger: {
        backgroundColor: '#FEE4E2',
    },
    textDanger: {
        color: colors.danger,
    },
});

{/* <Badge text="Activo" variant="success" /> */}