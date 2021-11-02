import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useAuth } from '@hooks/useAuth';
import { getTwoComments } from '@services/comments.api';
import { RootNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { Comment } from '@molecules/Comment';

import { Container } from './styles';

interface CommentsProps {
  causeId: number;
}

type CauseDetailsScreenProp = StackNavigationProp<RootNavigatorParamsList, 'PersonStack'>;

export function Comments({ causeId }: CommentsProps): JSX.Element {
  const rem = useRem();
  const theme = useTheme();
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigation = useNavigation<CauseDetailsScreenProp>();

  const { data } = useQuery(['causeTwoComments', causeId], () => getTwoComments(causeId));

  const handleMore = () => {
    navigation.navigate('Comments', { causeId });
  };

  return (
    <Container>
      <View style={{ marginBottom: 12 }}>
        <Text fontSize={rem(theme.fonts.size.sm)}>
          {data?.total || 0} {!data?.total || data?.total > 1 ? 'comentários' : 'comentário'}
        </Text>
      </View>
      {data?.results &&
        data.results.map((item) => (
          <Comment
            key={String(item.id)}
            isOwner={item.user.id === user.id}
            name={
              item.user.userType === 'organization'
                ? item.user.organization.name
                : item.user.person.name
            }
            comment={item.comment}
            photoUri={
              item.user.userType === 'organization'
                ? item.user.organization.profileImage
                : item.user.person.profileImage
            }
          />
        ))}
      {!!data?.total && data.total > 2 && (
        <TouchableOpacity onPress={handleMore}>
          <Text color={theme.colors.primary} fontSize={rem(theme.fonts.size.sm)} textAlign="center">
            {t('comment.view_more')}
          </Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}
