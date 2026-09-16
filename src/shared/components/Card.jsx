import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors.js';

export default function Card({ title, subtitle, icon, children, style }) {
    const hasHeader = title || subtitle || icon;

    return (
        <View style={[styles.card, style]}>
            {hasHeader && (
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                    </View>
                    {icon && <Text style={styles.icon}>{icon}</Text>}
                </View>
            )}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background,
        borderRadius: 16,
        zIndex: 10,
        paddingVertical: 14, 
        paddingHorizontal: 16, 
        borderWidth: 1,
        borderColor: colors.background,
        // Sombras para iOS y Web
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        // Sombra para Android
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    headerTextContainer: {
        flex: 1,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textHeadline,
    },
    subtitle: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    icon: {
        fontSize: 20,
    },
});

{/* <Card
    title="Registrar Usuario"
    subtitle="Crea perfiles y asigna responsabilidades"
>
    <TextInput label="Nombre Completo" placeholder="Ej. Carlos Mendoza" />
    <TextInput label="Correo" placeholder="correo@ejemplo.com" />

    <View style={{ marginTop: 16 }}>
        <Button title="Guardar" onPress={() => { }} variant="primary" />
    </View>
</Card> */}