import { Alert, ScrollView, TextStyle, View, ViewStyle } from 'react-native';

import Screen from '@/components/Screen';
import { Text } from '@/components/Text';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';
import hexToRgba from '@/utils/hexToRgba';

import Header from './components/Header';
import { LogoutItem } from './components/LogoutItem';
import { MenuItem } from './components/MenuItem';
import { ACCOUNT_ITEMS, ACTIVITY_ITEMS, MENU_VALUES } from './constants';

interface ISettingsScreenProps extends AppStackScreenProps<'Account'> {}

const SettingsScreen = ({ navigation }: ISettingsScreenProps) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme();

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.background}>
      <View style={themed($container)}>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[$styles.flex, $styles.flex1]}
        >
          <Text style={themed($cardTitle)} weight="medium" size="xxs">
            Account
          </Text>
          <View style={themed($card)}>
            {ACCOUNT_ITEMS.map(item => {
              return (
                <MenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  onPress={() => {
                    if (item.value === MENU_VALUES.PROFILE) {
                      navigation.navigate('Profile');
                      return;
                    }
                    Alert.alert('Not implemented');
                  }}
                />
              );
            })}
          </View>
          <View style={themed($borderBottom)} />
          <Text style={themed($cardTitle)} weight="medium" size="xs">
            General
          </Text>
          <View style={themed($card)}>
            {ACTIVITY_ITEMS.map(item => (
              <MenuItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                onPress={() => {
                  Alert.alert('Not implemented');
                }}
              />
            ))}
            <LogoutItem />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
};

const $cardTitle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  color: colors.palette.neutral600,
  marginTop: spacing.md,
});

const $borderBottom: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderBottomWidth: 1,
  borderBottomColor: hexToRgba(colors.border, 0.3),
  paddingBottom: spacing.md,
});

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  ...$styles.flex1,
});

const $card: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
});

export default SettingsScreen;
