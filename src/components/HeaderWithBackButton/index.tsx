import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { Icon } from '../Icon';
import { Text } from '../Text';

interface IHeaderWithBackButtonProps {
  onBackButtonPress: () => void;
  title: string;
}

const HeaderWithBackButton: React.FC<IHeaderWithBackButtonProps> = ({
  onBackButtonPress,
  title,
}) => {
  const { themed } = useAppTheme();
  return (
    <View style={themed($container)}>
      <TouchableWithoutFeedback onPress={onBackButtonPress}>
        <Icon icon="arrowLeft" size={20} />
      </TouchableWithoutFeedback>
      <Text weight="medium">{title}</Text>
    </View>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.md,
});

export default HeaderWithBackButton;
