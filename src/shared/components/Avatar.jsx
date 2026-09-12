import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from '../../theme/icons.js';

export default function Avatar({
    name,
    icon,
    size = 40,
    bgColor = '#FFD2C1',
    textColor = '#A83200',
    style
}) {
    // Extrae 2 iniciales
    const getInitials = (text) => {
        if (!text) return '';
        const parts = text.trim().split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return text.substring(0, 2).toUpperCase();
    };

    return (
        <View
            style={[
                styles.circle,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: icon ? '#F0F4FF' : bgColor,
                },
                style,
            ]}
        >
            {icon ? (
                <Icon name={icon} size={size * 0.45} color={textColor} />
            ) : (
                <Text style={[styles.text, { fontSize: size * 0.38, color: textColor }]}>
                    {getInitials(name)}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
    },
});

{/* <Avatar icon="home" size={40} textColor="#A83200" />
<Avatar name="Diego Vargas" size={40} /> */}