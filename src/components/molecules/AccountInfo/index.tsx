import React, { useEffect } from 'react';
import { useRem } from 'responsive-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@atoms/Text';
import { Switch } from '@molecules/Switch';

import { Container, Icon, Row } from './styles';

interface AccountInfoProps {
  name: string;
  email: string;
  onLogout: () => void;
}

export function AccountInfo({ name, email, onLogout }: AccountInfoProps): JSX.Element {
  const rem = useRem();

  const anim = useSharedValue(0);
  const textAnim = useSharedValue(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [0, 0.5, 1], [0, 0.3, 1]),
      transform: [{ translateY: interpolate(anim.value, [0, 1], [15, 0]) }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(anim.value, [0, 0.5, 1], [0, 0.3, 1]),
      transform: [{ translateY: interpolate(anim.value, [0, 1], [20, 0]) }],
    };
  });

  useEffect(() => {
    anim.value = withTiming(1, { duration: 300 });
    textAnim.value = withTiming(1, { duration: 600 });
  }, [anim, textAnim]);

  return (
    <Container>
      <Animated.View style={headerStyle}>
        <Row>
          <Text fontSize={rem(1.34)} fontFamily="bold">
            {name}
          </Text>
          <BorderlessButton onPress={onLogout}>
            <Icon name="logout-variant" />
          </BorderlessButton>
        </Row>
      </Animated.View>
      <Animated.View style={[textStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text fontSize={rem(0.8)} fontFamily="bold">
          {email}
        </Text>
        <Switch />
      </Animated.View>
    </Container>
  );
}
