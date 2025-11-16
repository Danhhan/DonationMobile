import { View, ScrollView, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

const PLACEHOLDERS = Array.from({ length: 5 }, (_, index) => index);

export const CategoriesSkeleton = () => {
  const { themed } = useAppTheme();

  return (
    <View>
      {/* <View style={themed($titleSkeleton)} /> */}
      <ScrollView
        horizontal
        style={themed($categoryList)}
        showsHorizontalScrollIndicator={false}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {PLACEHOLDERS.map(item => (
          <View
            key={item}
            style={themed([$categoryItem, $categoryItemSkeleton])}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const $categoryList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
});

const $categoryItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.gray100,
  paddingVertical: 16,
  paddingHorizontal: 38,
  borderRadius: 50,
  marginRight: 10,
  minHeight: 60,
  minWidth: 140,
});

const $categoryItemSkeleton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.gray100,
  opacity: 0.5,
});
