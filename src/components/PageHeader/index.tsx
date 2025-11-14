import { TextStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { Text } from '../Text';

interface IPageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: IPageHeaderProps) => {
  const { themed } = useAppTheme();

  return <Text style={themed($title)}>{title}</Text>;
};

const $title: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontFamily: typography.fonts.spaceGrotesk.bold,
  fontSize: 24,
  color: colors.text,
});

export default PageHeader;
