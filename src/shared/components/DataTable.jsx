import { StyleSheet, View, Text, FlatList, ScrollView, useWindowDimensions } from 'react-native';
import colors from '../../theme/colors';

export default function DataTable({ columns, data, title, footer, minWidth = 650 }) {
    const { width: screenWidth } = useWindowDimensions();
    const isMobile = screenWidth < 768;

    // Calcula el estilo de celda según el dispositivo
    const getColumnStyle = (col) => {
        if (isMobile) {
            // En móvil usamos anchos fijos/mínimos para mantener estructura con scroll horizontal
            return { width: col.width || 180 };
        }
        // En PC/Tablet usamos flex para ocupar todo el ancho disponible
        if (col.width && typeof col.width === 'number') {
            return { flex: col.flex || 1, minWidth: col.width };
        }
        return { flex: col.flex || 1 };
    };

    const renderHeader = () => (
        <View style={styles.tableHeader}>
            {columns.map((col) => (
                <View
                    key={col.key}
                    style={[
                        getColumnStyle(col),
                        col.align && { alignItems: col.align === 'right' ? 'flex-end' : 'flex-start' },
                    ]}
                >
                    <Text style={[styles.headerText, col.align && { textAlign: col.align }]} numberOfLines={1}>
                        {col.title.toUpperCase()}
                    </Text>
                </View>
            ))}
        </View>
    );

    const renderRow = ({ item, index }) => (
        <View style={[styles.row, index % 2 === 1 && styles.rowAlternate]}>
            {columns.map((col) => (
                <View
                    key={col.key}
                    style={[
                        styles.cell,
                        getColumnStyle(col),
                        col.align && { alignItems: col.align === 'right' ? 'flex-end' : 'flex-start' },
                    ]}
                >
                    {col.render ? (
                        col.render(item[col.key], item)
                    ) : (
                        <Text style={styles.cellText} numberOfLines={2}>
                            {item[col.key] ?? '-'}
                        </Text>
                    )}
                </View>
            ))}
        </View>
    );

    const renderTableContent = () => (
        <View style={{ width: isMobile ? minWidth : '100%' }}>
            {renderHeader()}
            <FlatList
                data={data}
                renderItem={renderRow}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                scrollEnabled={false}
            />
        </View>
    );

    return (
        <View style={styles.cardContainer}>
            {title && (
                <View style={styles.titleContainer}>
                    <Text style={styles.tableTitle}>{title}</Text>
                </View>
            )}

            {isMobile ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {renderTableContent()}
                </ScrollView>
            ) : (
                renderTableContent()
            )}

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
        width: '100%',
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
        justifyContent: 'center',
        paddingRight: 12,
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