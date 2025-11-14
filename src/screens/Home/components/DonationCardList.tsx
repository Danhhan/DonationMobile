import {
  Image,
  ImageStyle,
  Pressable,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';
import { getFontFamily } from '@/theme/typography';
import { ICategory, IDonation } from '@/types/donation';

interface IDonationCardListProps {
  dataList: IDonation[];
  categoryList: ICategory[];
}

const DonationCardList = ({
  dataList,
  categoryList,
}: IDonationCardListProps) => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($donationList)}>
      {dataList?.map(item => {
        const { name, price, categoryIds, donationItemId, image } = item || {};

        const category = categoryList.find(categoryItem =>
          categoryIds?.includes(categoryItem.categoryId),
        );

        return (
          <Pressable key={donationItemId} style={themed($donationItem)}>
            <View>
              {category && (
                <View style={themed($categoryBadge)}>
                  <Text style={themed($categoryBadgeText)}>
                    {category.name}
                  </Text>
                </View>
              )}
              <Image
                resizeMode="cover"
                source={{
                  uri: image,
                }}
                style={themed($donationImage)}
              />
            </View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={themed($donationName)}
            >
              {name}
            </Text>
            <Text style={themed($donationPrice)}>{price}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const $donationName: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  fontFamily: getFontFamily('SpaceGrotesk', '600'),
  fontSize: 16,
  color: colors.text,
  marginTop: spacing.md,
  width: '100%',
});

const $donationPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontFamily: getFontFamily('SpaceGrotesk', '600'),
  fontSize: 16,
  color: colors.palette.primary500,
});

const $donationList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  ...$styles.row,
  ...$styles.flexWrap,
  justifyContent: 'space-between',
  rowGap: spacing.md,
});

const $donationItem: ThemedStyle<ViewStyle> = () => ({
  width: '48%',
});

const $categoryBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.green900,
  minWidth: 84,
  height: 22,
  paddingHorizontal: 10,
  ...$styles.center,
  borderRadius: 50,
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 10,
});

const $categoryBadgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 10,
  fontFamily: getFontFamily('SpaceGrotesk', '600'),
});

const $donationImage: ThemedStyle<ImageStyle> = () => ({
  height: 170,
  width: '100%',
  borderRadius: 20,
});

export default DonationCardList;
