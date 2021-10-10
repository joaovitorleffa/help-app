import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { useTranslation } from 'react-i18next';
import { FeedbackImage } from '@dto/cause-dto';

import { Text } from '@atoms/Text';
import { FeedbackPhoto } from '@molecules/FeedbackPhoto';

import { Container, Wrapper } from './styles';

interface FeedbackProps {
  feedback: string;
  images: Array<FeedbackImage>;
}

export function Feedback({ feedback, images }: FeedbackProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: { item: FeedbackImage }) => (
      <FeedbackPhoto uri={item.name} style={{ marginRight: 16, borderWidth: 0 }} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: FeedbackImage) => String(item.id), []);

  return (
    <Container>
      {!!feedback && (
        <>
          <Wrapper>
            <Text fontFamily="bold" fontSize={rem(theme.fonts.size.lg)} color={theme.colors.title}>
              {t('common.feedback')}
            </Text>
          </Wrapper>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            style={{ marginVertical: 16 }}
            contentContainerStyle={{ paddingLeft: theme.spacing.grid }}
            showsHorizontalScrollIndicator={false}
          />
          <Wrapper>
            <Text fontSize={rem(theme.fonts.size.sm)} color={theme.colors.text}>
              {feedback}
            </Text>
          </Wrapper>
        </>
      )}
    </Container>
  );
}
