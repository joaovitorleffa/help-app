import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { PanGestureHandler, RectButtonProps } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { ButtonContainer, FloatBtn, Icon } from './styles';

const AnimatedButtonContainer = Animated.createAnimatedComponent(ButtonContainer);
const AnimatedFloatButton = Animated.createAnimatedComponent(FloatBtn);

interface FloatButtonProps extends RectButtonProps {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function FloatButton({ icon, ...rest }: FloatButtonProps): JSX.Element {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive: (event, context: any) => {
      positionX.value = context.positionX + event.translationX;
      positionY.value = context.positionY + event.translationY;
    },
    onEnd: () => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const floatButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <AnimatedButtonContainer style={floatButtonStyle}>
        <AnimatedFloatButton {...rest}>
          <Icon name={icon} />
        </AnimatedFloatButton>
      </AnimatedButtonContainer>
    </PanGestureHandler>
  );
}
