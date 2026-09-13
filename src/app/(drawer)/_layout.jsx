import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View, Text, StyleSheet } from 'react-native';

import CustomDrawerContent from '../../shared/components/DrawerContent.jsx';
import colors from '../../theme/colors';

function HeaderNavbar() {
  return (
    <View style={styles.navbarInfo}>
      <Text style={styles.locationText}>🏠 Granjita Doña Rosa • Emprendimiento</Text>
      <Text style={styles.badgeText}>Josué 1:9</Text>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitle: () => <HeaderNavbar />,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.buttonSecondary,
        },
        headerTintColor: colors.secondary,
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: 'Inicio' }} />
      <Drawer.Screen name="usuarios" options={{ drawerLabel: 'Usuarios' }} />
      <Drawer.Screen name="encierros" options={{ drawerLabel: 'Encierros' }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navbarInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  badgeText: {
    fontSize: 11,
    color: colors.primary,
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontWeight: '700',
  },
});