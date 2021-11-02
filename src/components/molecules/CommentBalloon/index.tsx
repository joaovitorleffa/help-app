import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Text } from '@atoms/Text';

import { Container, Icon } from './styles';

interface CommentBallonProps {
  name: string;
  comment: string;
  isOwner?: boolean;
}

export function CommentBalloon({
  name,
  comment,
  isOwner = false,
}: CommentBallonProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();
  return (
    <Container>
      <Icon name="triangle-left" />
      <Text
        fontFamily="bold"
        color={isOwner ? theme.colors.primary : theme.colors.title}
        fontSize={rem(theme.fonts.size.sm)}>
        {name}
      </Text>
      <Text color={theme.colors.text} fontSize={rem(theme.fonts.size.xs)} lineHeight={18}>
        {comment}
      </Text>
    </Container>
  );
}
