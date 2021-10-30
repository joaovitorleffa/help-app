import React, { ReactNode } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useKeyboard } from '@hooks/useKeyboard';

const WINDOW_HEIGHT = Dimensions.get('window').height;

interface KeyboardShiftProps {
  children: ReactNode;
}

const KeyboardShift = ({ children }: KeyboardShiftProps): JSX.Element => {
  const shift = useSharedValue(0);

  const didOpen = () => {
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = WINDOW_HEIGHT - keyboardHeight - (fieldTop - fieldHeight);
      if (gap >= 0) {
        return;
      }
      shift.value = withTiming(gap, { duration: 1000 });
    });
  };

  const didHide = () => {
    shift.value = withTiming(0, { duration: 1000 });
  };

  const { keyboardHeight } = useKeyboard(didHide, didOpen);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: shift.value }],
    };
  });

  if (Platform.OS === 'android') {
    return <Animated.View style={[{ flex: 1 }, animStyle]}>{children}</Animated.View>;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardShift;
