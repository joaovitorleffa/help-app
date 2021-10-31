import React from 'react';
import { Text } from '@atoms/Text';
import Animated, {
  interpolate,
  interpolateColors,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Container, Content } from './styles';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useSwitchTheme } from '@hooks/useSwitchTheme';

const AnimatedContent = Animated.createAnimatedComponent(Content);

export function Switch(): JSX.Element {
  const { checked, onChange } = useSwitchTheme();
  const position = useSharedValue(checked ? 1 : 0);
  const rem = useRem();
  const theme = useTheme();

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(position.value, [0, 1], [2, 32]),
        },
      ],
    };
  });

  const positionReverseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(position.value, [1, 0], [32, 2]),
        },
      ],
    };
  });

  const anim = () => {
    !checked
      ? (position.value = withTiming(1, { duration: 400 }))
      : (position.value = withTiming(0, { duration: 400 }));
    onChange();
  };

  return (
    <Container onPress={anim}>
      <Text style={{ position: 'absolute', left: 2 }} fontSize={rem(theme.fonts.size.sm)}>
        🌜
      </Text>
      <Text style={{ position: 'absolute', right: 2 }} fontSize={rem(theme.fonts.size.sm)}>
        🌞
      </Text>
      <AnimatedContent
        style={[positionStyle, positionReverseStyle, { backgroundColor: '#7E6EF5' }]}
      />
    </Container>
  );
}
