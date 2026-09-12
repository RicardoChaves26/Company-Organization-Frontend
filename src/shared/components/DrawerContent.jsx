import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Badge from './Badge';
import colors from '../../theme/colors.js';

const MODULES = [
  { label: 'Pantalla Inicial', route: '/(drawer)/landing' },
  { label: 'Usuarios', route: '/(drawer)/usuarios' },
  { label: 'Encierros', route: '/(drawer)/encierros' },
  { label: 'Lotes', route: '/(drawer)/lotes' },
  { label: 'Inventario', route: '/(drawer)/inventarios' },
  { label: 'Alimentacion', route: '/(drawer)/alimentacion' },
  { label: 'Mantenimiento', route: '/(drawer)/mantenimientos' },
  { label: 'Ventas', route: '/(drawer)/ventas' },
  { label: 'Fletes', route: '/(drawer)/fletes' },
  { label: 'Ver Registros & PDF', route: '/(drawer)/trazabilidad' },
];

export default function CustomDrawerContent(props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER DE MARCA */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>Company Organization</Text>
        <Text style={styles.brandSubtitle}>GRANJITA ROSA</Text>
      </View>

      {/* BADGE DE ESTADO */}
      <View style={styles.statusRow}>
        <Badge text="COLOSENSES 3:23" variant="success" size="small" />
      </View>

      {/* LISTA DE MÓDULOS */}
      <View style={styles.menuContainer}>
        {MODULES.map((item) => {
          const isActive = pathname === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => router.push(item.route)}
            >
              <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  brandContainer: {
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textHeadline,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardBackground,
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  liveText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  menuContainer: {
    gap: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: colors.primary,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
  },
  menuTextActive: {
    color: colors.background,
    fontWeight: '700',
  },
});