import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors.js';

const ICON_MAP = {
  user: 'person-outline',
  lock: 'lock-closed-outline',
  email: 'mail-outline',
  calendar: 'calendar-outline',
  phone: 'call-outline',
  eye: 'eye-outline',
  eyeOff: 'eye-off-outline',
  search: 'search-outline',
  chevronDown: 'chevron-down-outline',
  home: 'home-outline',
  close: 'close-outline',
  check: 'checkmark-outline',
};

export default function Icon({ name, size = 20, color = colors.textMuted, style }) {
  const iconName = ICON_MAP[name] || name;
  return <Ionicons name={iconName} size={size} color={color} style={style} />;
}