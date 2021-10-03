import React from 'react';
import { View } from 'react-native';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { OrganizationNavigatorParamsList } from '@routes/types';

import { Info } from '@molecules/Info';
import { Button } from '@molecules/Button';
import { BackHeader } from '@molecules/BackHeader';
import { CauseDetailsInfo } from '@organisms/Common/CauseDetailsInfo';

import { Container, Content, Header } from './styles';
import { isBefore } from 'date-fns';
import { FloatButton } from '@molecules/FloatButton';
import { StackNavigationProp } from '@react-navigation/stack';

type CauseRouteScreenProp = RouteProp<OrganizationNavigatorParamsList, 'Cause'>;

type CauseNavigationScreenProp = StackNavigationProp<OrganizationNavigatorParamsList, 'Cause'>;

export function Cause(): JSX.Element {
  const route = useRoute<CauseRouteScreenProp>();
  const navigation = useNavigation<CauseNavigationScreenProp>();

  const theme = useTheme();
  const rem = useRem();
  const { t } = useTranslation();

  const { title, description, endAt, type } = route.params;

  const isEnded = isBefore(new Date(endAt), new Date());

  const handleEdit = () => {
    navigation.navigate('EditCause', { ...route.params });
  };

  return (
    <Container>
      <Content>
        <View>
          <Header>
            <BackHeader title={title} />
          </Header>
          <CauseDetailsInfo endAt={endAt} description={description} type={type} />
        </View>
        {!isEnded && <FloatButton icon="edit" onPress={handleEdit} />}
        {isEnded && (
          <View>
            <Info text={t('cause.add_feedback_info')} />
            <Button
              title={t('cause.add_feedback')}
              color={theme.colors.success}
              textColor={theme.colors.title_secondary}
              style={{ marginTop: rem(0.9) }}
              onPress={() => {}}
            />
          </View>
        )}
      </Content>
    </Container>
  );
}
