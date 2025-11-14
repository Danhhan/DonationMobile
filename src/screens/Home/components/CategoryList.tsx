import {
  Pressable,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { getFontFamily } from '@/theme/typography';
import { ICategory } from '@/types/donation';

interface ICategoryListProps {
  dataList: ICategory[];
  selectedIdx: number;
  setSelectedIdx: (idx: number) => void;
}

const CategoryList = ({
  dataList,
  selectedIdx,
  setSelectedIdx,
}: ICategoryListProps) => {
  const { themed } = useAppTheme();
  return (
    <View>
      <Text style={themed($title)}>Select Category</Text>
      <ScrollView
        horizontal
        style={themed($categoryList)}
        showsHorizontalScrollIndicator={false}
      >
        {dataList.map((item, index) => {
          return (
            <Pressable
              key={item.categoryId}
              style={[
                themed($categoryItem),
                selectedIdx === index && themed($categoryItemActive),
              ]}
              onPress={() => setSelectedIdx(index)}
            >
              <Text
                style={[
                  themed($categoryItemText),
                  selectedIdx === index && themed($categoryItemTextActive),
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 18,
  fontFamily: getFontFamily('SpaceGrotesk', '600'),
  color: colors.text,
});

const $categoryList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
});

const $categoryItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.gray100,
  paddingVertical: 16,
  paddingHorizontal: 38,
  borderRadius: 50,
  marginRight: 10,
});

const $categoryItemActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
});

const $categoryItemText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.secondary300,
  fontFamily: getFontFamily('SpaceGrotesk', '500'),
});

const $categoryItemTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
});

export default CategoryList;
