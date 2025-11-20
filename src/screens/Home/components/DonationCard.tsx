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
import { ICategory } from '@/types/category';
import { IDonation } from '@/types/donation';

interface IDonationCardProps {
  data: IDonation;
  categoryList: ICategory[];
}

const DonationCard = ({ data, categoryList }: IDonationCardProps) => {
  const { themed } = useAppTheme();
  const { name, price, categoryIds, image } = data || {};

  const category = categoryList.find(categoryItem =>
    categoryIds?.includes(categoryItem.id),
  );

  return (
    <Pressable style={themed($donationItem)}>
      <View>
        {category && (
          <View style={themed($categoryBadge)}>
            <Text style={themed($categoryBadgeText)}>{category.name}</Text>
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
  minHeight: 190,
  width: '100%',
  borderRadius: 20,
});

export default DonationCard;
