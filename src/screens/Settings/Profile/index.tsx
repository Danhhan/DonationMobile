import { useState } from 'react';
import { Alert, ScrollView, View, ViewStyle } from 'react-native';

import Avatar from '@/components/Avatar';
import HeaderWithBackButton from '@/components/HeaderWithBackButton';
import { Icon } from '@/components/Icon';
import Screen from '@/components/Screen';
import { useAuth } from '@/context/AuthProvider';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

import { ProfileMenuItems } from '../components/ProfileMenuItems';
import { Section } from '../components/Section';

interface IProfileScreenProps extends AppStackScreenProps<'Profile'> {}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation }) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme();
  const [shouldThrow, setShouldThrow] = useState(false);
  const { user } = useAuth();
  if (shouldThrow) {
    throw new Error('Test error for ErrorBoundary');
  }

  const publicMenuItems = [
    {
      title: 'Display name',
      description: user?.fullName || '--',
      action: () => {
        Alert.alert('Display name');
      },
    },
    {
      title: 'Email',
      description: user?.email || '--',
      action: () => {},
    },
  ];

  const privateMenuItems = [
    {
      description: 'Legal name',
      action: () => {
        Alert.alert('Legal name');
      },
    },
    {
      description: 'Date of birth',
      action: () => {
        setShouldThrow(true);
      },
    },
    {
      description: 'Phone number',
      action: () => {},
    },
  ];

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
        >
          <Section
            title="Public"
            subTitle="These details are displayed on your public profile. Anyone can see them"
            menuItems={<ProfileMenuItems menuItems={publicMenuItems} />}
          >
            <View style={themed($avatarContainer)}>
              <Avatar size="md" />
              <View style={themed($editIconContainer)}>
                <Icon
                  color={colors.palette.neutral500}
                  size={14}
                  icon="editBold"
                />
              </View>
            </View>
          </Section>
          <Section
            title="Private"
            subTitle="These details are not displayed on your public profile. Only you can see them"
            menuItems={<ProfileMenuItems menuItems={privateMenuItems} />}
          />
        </ScrollView>
      </View>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  ...$styles.flex1,
});

const $avatarContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.lg,
  position: 'relative',
  width: 80,
});

const $editIconContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  position: 'absolute',
  right: -4,
  bottom: -4,
  width: 30,
  height: 30,
  backgroundColor: colors.palette.neutral300,
  borderRadius: spacing.xxl,
  ...$styles.center,
  borderWidth: 3,
  borderColor: colors.palette.neutral100,
});

export default ProfileScreen;
