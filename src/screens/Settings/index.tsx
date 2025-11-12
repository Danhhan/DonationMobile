import { ScrollView, View, ViewStyle } from 'react-native';

import { PressableIcon } from '@/components/Icon';
import Screen from '@/components/Screen';
import { Text } from '@/components/Text';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

import { LogoutItem } from './components/LogoutItem';
import { MenuItem } from './components/MenuItem';
import UserInfo from './components/UserInfo';
import { accountItems, activityItems } from './constants';

interface ISettingsScreenProps extends AppStackScreenProps<'Settings'> {}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme();

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.palette.neutral100}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[$styles.flex, $styles.flex1]}
      >
        <View
          style={themed(({ spacing }) => ({
            paddingHorizontal: spacing.md,
          }))}
        >
          <PressableIcon
            size={24}
            icon="back"
            onPress={() => navigation.goBack()}
          />
          <UserInfo />
        </View>
        <View style={themed($content)}>
          <Text
            style={themed(() => ({
              color: colors.palette.neutral600,
            }))}
            weight="medium"
            size="xs"
            textTransform="uppercase"
          >
            Account
          </Text>
          <View style={themed($card)}>
            {accountItems.map(item => (
              <MenuItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                isLast={item.isLast}
              />
            ))}
          </View>

          <Text
            style={themed(() => ({
              color: colors.palette.neutral600,
            }))}
            weight="medium"
            size="xs"
            textTransform="uppercase"
          >
            Activity
          </Text>
          <View style={themed($card)}>
            {activityItems.map(item => (
              <MenuItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                isLast={item.isLast}
              />
            ))}
          </View>

          <View style={themed($card)}>
            <LogoutItem />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const $content: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  ...$styles.flex1,
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.md,
});

const $card: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.sm,
  marginTop: spacing.sm,
  marginBottom: spacing.md,
});

export default SettingsScreen;
