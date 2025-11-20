import { useState } from 'react';
import { Animated, Image, TextStyle, ViewStyle } from 'react-native';
import BootSplash from 'react-native-bootsplash';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { Text } from '../Text';

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = ({ onAnimationEnd }: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [textOpacity] = useState(() => new Animated.Value(0));
  const [textTranslateY] = useState(() => new Animated.Value(20));
  const { themed } = useAppTheme();
  const { container, logo } = BootSplash.useHideAnimation({
    manifest: require('../../../assets/bootsplash/manifest.json'),

    logo: require('../../../assets/bootsplash/logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Animation text appear after logo
      Animated.sequence([
        Animated.delay(500), // Delay 500ms before text appear
        Animated.parallel([
          Animated.timing(textOpacity, {
            useNativeDriver: true,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(textTranslateY, {
            useNativeDriver: true,
            toValue: 0,
            duration: 800,
          }),
        ]),
      ]).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity }]}>
      <Image {...logo} />
      <Animated.View
        style={[
          themed($textContainer),
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <Text size="md" weight="medium" style={themed($text)}>
          Donation App
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const $text: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
});

const $textContainer: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  top: '56%',
  left: 0,
  right: 0,
  alignItems: 'center',
});
