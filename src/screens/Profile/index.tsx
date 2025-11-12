import { ScrollView, View, ViewStyle } from 'react-native';

import HeaderWithBackButton from '@/components/HeaderWithBackButton';
import Screen from '@/components/Screen';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

interface IProfileScreenProps extends AppStackScreenProps<'Profile'> {}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation }) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme();

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.palette.neutral100}>
      <View style={themed($container)}>
        <HeaderWithBackButton
          onBackButtonPress={() => navigation.goBack()}
          title="Profile"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[$styles.flex, $styles.flex1]}
        />
      </View>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
});

export default ProfileScreen;
