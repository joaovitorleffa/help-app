import React, { useEffect } from 'react';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Ripple as Rpl } from './styles';

const AnimatedRippleView = Animated.createAnimatedComponent(Rpl);

interface RippleViewProps {
  index: number;
  backgroundColor: string;
}

export const Ripple = ({ index, backgroundColor }: RippleViewProps): JSX.Element => {
  const anim = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [0, 1], [1, 0]),
      transform: [{ scale: interpolate(anim.value, [0, 1], [1, 2]) }],
    };
  });

  useEffect(() => {
    anim.value = withDelay(
      600 * index,
      withRepeat(
        withDelay(
          600,
          withTiming(1, { duration: 1600, easing: Easing.bezier(0.49, 0.35, 0.47, 0.98) }),
        ),
        -1,
      ),
    );
  }, [anim, index]);

  return (
    <AnimatedRippleView
      style={[
        animStyle,
        {
          backgroundColor,
        },
      ]}
    />
  );
};
