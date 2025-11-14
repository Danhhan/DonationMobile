import { View } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';

import Screen from '../Screen';

import ActivityIndicator from '.';

const FullScreenLoader = () => {
  const { themed } = useAppTheme();
  return (
    <Screen safeAreaEdges={['top', 'bottom']}>
      <View style={themed([$styles.flex1, $styles.center])}>
        <ActivityIndicator />
      </View>
    </Screen>
  );
};

export default FullScreenLoader;
