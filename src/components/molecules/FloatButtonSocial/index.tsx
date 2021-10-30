import React from 'react';
import { useTheme } from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Ripple } from '@atoms/Ripple';

import { Container, FloatBtn, Icon } from './styles';

interface FloatButtonProps extends RectButtonProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
}

export function FloatButtonSocial({ ...rest }: FloatButtonProps): JSX.Element {
  const theme = useTheme();

  return (
    <Container>
      {[1].map((_, index) => (
        <Ripple key={index} index={index} backgroundColor={theme.colors.success} />
      ))}
      <FloatBtn {...rest}>
        <Icon name="whatsapp" />
      </FloatBtn>
    </Container>
  );
}
