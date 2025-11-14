import { TextStyle, TouchableOpacity } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface IAuthSwitchTextProps {
  onPress: () => void;
  title: string;
}

const AuthSwitchText = ({ onPress, title }: IAuthSwitchTextProps) => {
  const { themed } = useAppTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={themed($text)}>{title}</Text>
    </TouchableOpacity>
  );
};

const $text: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  textAlign: 'center',
  fontFamily: typography.primary.medium,
  fontSize: 16,
  color: colors.palette.primary500,
});

export default AuthSwitchText;
