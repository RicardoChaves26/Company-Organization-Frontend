import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';

export default function DataTable({ columns, data, title, footer }) {

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            {columns.map((col) => (
                <Text
                    key={col.key}
                    style={[
                        styles.headerText,
                        col.width ? { width: col.width } : { flex: 1 },
                        col.align && { textAlign: col.align },
                    ]}
                >
                    {col.title.toUpperCase()}
                </Text>
            ))}
        </View>
    );

    // Renderizado de cada fila
    const renderRow = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && styles.rowAlternate]}>
            {columns.map((col) => (
                <View
                    key={col.key}
                    style={[
                        styles.cell,
                        col.width ? { width: col.width } : { flex: 1 },
                        col.align && { alignItems: col.align === 'right' ? 'flex-end' : 'flex-start' },
                    ]}
                >
                    {col.render ? (
                        col.render(item[col.key], item)
                    ) : (
                        <Text style={styles.cellText}>{item[col.key] ?? '-'}</Text>
                    )}
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.cardContainer}>
            {/* Título Superior Opción (como en la Imagen 3) */}
            {title && (
                <View style={styles.titleContainer}>
                    <Text style={styles.tableTitle}>{title}</Text>
                </View>
            )}

            {/* Tabla */}
            {renderHeader()}
            <FlatList
                data={data}
                renderItem={renderRow}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                scrollEnabled={false} // Si está dentro de un ScrollView general
            />

            {/* Pie de Tabla (Paginación / Totales) */}
            {footer && (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {footer.totalText || `Mostrando ${data.length} registros`}
                    </Text>
                    {footer.actions && <View style={styles.footerActions}>{footer.actions}</View>}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.background,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EBF0F5',
        overflow: 'hidden',
        elevation: 2,
        marginVertical: 10,
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 10,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textHeadline,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: colors.cardBackground,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.buttonSecondary,
    },
    headerText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    rowAlternate: {
        backgroundColor: '#FAFCFF',
    },
    cell: {
        justify: 'center',
    },
    cellText: {
        fontSize: 13,
        color: colors.textBody,
        fontWeight: '500',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#F8FAFC',
        borderTopWidth: 1,
        borderTopColor: colors.buttonSecondary,
    },
    footerText: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '500',
    },
    footerActions: {
        flexDirection: 'row',
        gap: 8,
    },
});

{/* <DataTable columns={columns} data={datos} />; */}
// Se debe tener una de columnas y otra de datos ejemplo. 
// Esto para datos mock