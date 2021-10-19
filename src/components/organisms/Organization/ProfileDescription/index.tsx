import React, { useEffect } from 'react';
import { useRem } from 'responsive-native';

import { Text } from '@atoms/Text';
import { AccountInfo } from '@molecules/AccountInfo';

import { Container, Wrapper } from './styles';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';

interface ProfileDescriptionProps {
  name: string;
  email: string;
  description: string;
  onLogout: () => void;
}

export function ProfileDescription({
  name,
  email,
  description,
  onLogout,
}: ProfileDescriptionProps): JSX.Element {
  const rem = useRem();

  const anim = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [0, 0.5, 1], [0, 0.3, 1]),
      transform: [{ translateY: interpolate(anim.value, [0, 1], [15, 0]) }],
    };
  });

  useEffect(() => {
    anim.value = withTiming(1, { duration: 600 });
  }, [anim]);

  return (
    <Container>
      <AccountInfo name={name} email={email} onLogout={onLogout} />
      <Animated.View style={animStyle}>
        <Wrapper>
          <Text fontSize={rem(0.8)}>
            {description ? description : 'Sua descrição aparecerá aqui'}
          </Text>
        </Wrapper>
      </Animated.View>
    </Container>
  );
}
