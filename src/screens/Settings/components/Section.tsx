import { View, ViewStyle } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface ISection {
  title: string;
  subTitle: string;
  menuItems: React.ReactNode;
  children?: React.ReactNode;
}

export const Section = ({ title, subTitle, children, menuItems }: ISection) => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text size="sm" preset="bold">
          {title}
        </Text>
        <Text style={themed($subTitle)} size="xs" preset="default">
          {subTitle}
        </Text>
        {children}
      </View>
      {menuItems}
    </View>
  );
};

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  marginBlock: spacing.md,
});

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: spacing.md,
  paddingVertical: spacing.md,
  marginBottom: spacing.md,
});

const $subTitle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingTop: spacing.sm,
  color: colors.palette.neutral600,
});
