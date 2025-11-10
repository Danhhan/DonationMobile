import { FC } from 'react';
import { View, TextStyle, TextInputProps, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import hexToRgba from '@/utils/hexToRgba';

import { Text } from '../Text';
import { TextInput } from '../TextInput';

interface IInputProps extends TextInputProps {
  label?: string;
  helper?: string;
}

export const Input: FC<IInputProps> = ({ label, helper, ...props }) => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($container)}>
      {label && <Text style={themed($label)}>{label}</Text>}
      <TextInput {...props} style={themed($input)} />
      {helper && <Text style={themed($helper)}>{helper}</Text>}
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.lg,
  position: 'relative',
});

const $helper: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.fonts.spaceGrotesk.normal,
  fontSize: 12,
  lineHeight: 16,
  color: colors.error,
  position: 'absolute',
  bottom: 0,
});

const $label: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.fonts.spaceGrotesk.normal,
  fontSize: 12,
  lineHeight: 16,
  color: colors.textLabel,
});

const $input: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: hexToRgba(colors.border, 0.3),
});
