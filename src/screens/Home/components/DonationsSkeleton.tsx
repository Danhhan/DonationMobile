import { View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const PLACEHOLDERS = Array.from({ length: 4 }, (_, index) => index);

export const DonationsSkeleton = () => {
  const { themed } = useAppTheme();

  return (
    <View style={themed($list)}>
      {PLACEHOLDERS.map(item => (
        <View key={item} style={themed($card)}>
          <View style={themed($badge)} />
          <View style={themed($image)} />
          <View style={themed($titleLine)} />
          <View style={themed($priceLine)} />
        </View>
      ))}
    </View>
  );
};

const $list: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  rowGap: spacing.md,
});

const $card: ThemedStyle<ViewStyle> = () => ({
  width: '48%',
  overflow: 'hidden',
});

const $badge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: 'absolute',
  top: 18,
  left: 18,
  height: 22,
  width: 86,
  borderRadius: 50,
  backgroundColor: colors.palette.gray200,
  zIndex: 1,
});

const $image: ThemedStyle<ViewStyle> = ({ colors }) => ({
  minHeight: 170,
  borderRadius: 16,
  backgroundColor: colors.palette.gray100,
});

const $titleLine: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.xs,
  height: 18,
  width: '70%',
  borderRadius: 8,
  backgroundColor: colors.palette.gray100,
});

const $priceLine: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.sm,
  height: 16,
  width: '40%',
  borderRadius: 8,
  backgroundColor: colors.palette.gray100,
});
