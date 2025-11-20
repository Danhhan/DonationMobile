import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MIN_POST_HEIGHT = 100;

export function useInitialNumToRender({
  minItemHeight = MIN_POST_HEIGHT,
  screenHeightOffset = 0,
}: { minItemHeight?: number; screenHeightOffset?: number } = {}) {
  const { height: screenHeight } = useWindowDimensions();
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();

  const finalHeight =
    screenHeight - screenHeightOffset - topInset - bottomInset;

  const minItems = Math.floor(finalHeight / minItemHeight);
  if (minItems < 1) {
    return 1;
  }
  return minItems;
}
