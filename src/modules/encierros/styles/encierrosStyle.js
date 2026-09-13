import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors.js';

export const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 2,
        marginBottom: 12,
    },
    badgeCategory: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.primary,
        letterSpacing: 1.2,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.black,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'flex-end',
        marginBottom: 0,
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    colFlex: {
        flex: 2,
    },
    actionsDesktop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 2,
    },
    colMobile: {
        flexDirection: 'column',
        gap: 12,
    },
    itemMobile: {
        width: '100%',
    },
    actionsMobile: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
        width: '100%',
    },
    tableHeaderSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        marginBottom: 12,
        paddingHorizontal: 2,
    },
    tableSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.black,
    },
    badgeCount: {
        backgroundColor: colors.background,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
    },
    badgeCountText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.iconBackgroundBlue,
    },
    encierroCell: {
        justifyContent: 'center',
        flexShrink: 1,
    },
    encierroName: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.buttonInverted,
    },
    encierroCode: {
        fontSize: 11,
        color: colors.primary,
        marginTop: 1,
        fontWeight: '600',
    },
});