import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default function DrawerHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a AviControl!</Text>
      <Text style={styles.subtitle}>Selecciona un módulo en el menú lateral.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textHeadline,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
  },
});