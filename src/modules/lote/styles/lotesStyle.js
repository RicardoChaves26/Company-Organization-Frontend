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
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 4,
    },
    alignEnd: {
        alignItems: 'flex-end',
        marginBottom: 0,
    },
    col3: {
        flex: 1,
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
        marginBottom: 12,
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
});