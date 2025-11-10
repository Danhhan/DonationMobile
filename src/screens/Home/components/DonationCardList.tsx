import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';

import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { getFontFamily } from '@/theme/typography';

interface IDonationCardListProps {}

const DonationCardList: React.FC<IDonationCardListProps> = () => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($wrapper)}>
      <View style={themed($donationList)}>
        <View style={themed($donationItem)}>
          <View style={themed($donationImageContainer)}>
            <View style={themed($categoryBadge)}>
              <Text style={themed($categoryBadgeText)}>Category name</Text>
            </View>
            <View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507697364665-69eec30ea71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80',
                }}
                style={{
                  height: 170,
                  width: 155,
                }}
              />
            </View>
          </View>
        </View>
        <View style={themed($donationItem)}>
          <View style={themed($donationImageContainer)}>
            <View style={themed($categoryBadge)}>
              <Text style={themed($categoryBadgeText)}>Category name</Text>
            </View>
            <View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1507697364665-69eec30ea71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80',
                }}
                style={{
                  height: 170,
                  width: 155,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const $wrapper: ThemedStyle<ViewStyle> = () => ({
  marginTop: 20,
});

const $donationList: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  backgroundColor: 'red',
});

const $donationItem: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  // ...$styles.flex1,
});

const $donationImage: ThemedStyle<ImageStyle> = () => ({
  height: 170,
});

const $categoryBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.green900,
  width: 84,
  height: 22,
  justifyContent: 'center',
  alignItems: 'center',
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

const $donationImageContainer: ThemedStyle<ViewStyle> = () => ({
  position: 'relative',
  borderRadius: 30,
  overflow: 'hidden',
});

export default DonationCardList;
