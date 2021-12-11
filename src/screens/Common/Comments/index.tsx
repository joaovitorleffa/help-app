import KeyboardShift from '@atoms/KeyboardShift';
import { CommentDto, CommentResultDto } from '@dto/comments-dto';
import { useAuth } from '@hooks/useAuth';
import { BackHeader } from '@molecules/BackHeader';
import { Comment } from '@molecules/Comment';
import { CommentInput } from '@molecules/CommentInput';
import { Skeleton } from '@motify/skeleton';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootNavigatorParamsList } from '@routes/types';
import { createComment, getComments } from '@services/comments.api';
import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRem } from 'responsive-native';

import { Container, Content } from './styles';

const keyExtractor = (item: CommentResultDto) => String(item.id);

type CommentsRouteScreenProp = RouteProp<RootNavigatorParamsList, 'Comments'>;

export function Comments(): JSX.Element {
  const route = useRoute<CommentsRouteScreenProp>();
  const { causeId } = route.params;
  const { user, person, organization } = useAuth();
  const queryClient = useQueryClient();
  const rem = useRem();

  const { data, isLoading } = useQuery(['causeComments', causeId], () => getComments(causeId));

  const { mutate } = useMutation(createComment, {
    onError: () => {
      showMessage({
        message: 'Erro',
        description: 'Não foi possível cadastrar o comentário',
        type: 'danger',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('causeTwoComments');
      await queryClient.invalidateQueries('causeComments');
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: CommentResultDto }) => (
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
    ),
    [user],
  );

  const handleComment = (comment: string) => {
    mutate({ comment, causeId, userId: user.id });
  };

  return (
    <KeyboardShift>
      <Container>
        <Content>
          <BackHeader title="Comentários" />
          {isLoading ? (
            <>
              {[0, 1, 2].map((row, key) => (
                <View key={String(key)} style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <Skeleton height={rem(2.8)} width={rem(2.8)} radius="round" />
                  <View style={{ marginLeft: 12 }}>
                    <Skeleton width={280} height={rem(2.8)} />
                  </View>
                </View>
              ))}
            </>
          ) : (
            <FlatList
              data={data?.results ?? []}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Content>
        <CommentInput
          photo={user.userType === 'organization' ? organization.profileImage : person.profileImage}
          onComment={handleComment}
        />
      </Container>
    </KeyboardShift>
  );
}
