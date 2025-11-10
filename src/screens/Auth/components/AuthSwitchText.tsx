import { TextStyle, TouchableOpacity } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface IAuthSwitchTextProps {
  onPress: () => void;
  title: string;
}

const AuthSwitchText: React.FC<IAuthSwitchTextProps> = ({ onPress, title }) => {
  const { themed } = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={themed($text)}>{title}</Text>
    </TouchableOpacity>
  );
};

const $text: ThemedStyle<TextStyle> = ({ spacing, typography, colors }) => ({
  marginTop: spacing.lg,
  textAlign: 'center',
  fontFamily: typography.primary.medium,
  fontSize: 16,
  color: colors.palette.primary500,
});

export default AuthSwitchText;
