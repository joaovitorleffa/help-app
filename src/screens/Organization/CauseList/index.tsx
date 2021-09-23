import React, { useCallback } from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { OrganizationAppNavigatorParamsList, OrganizationNavigatorParamsList } from '@routes/types';

import { Text } from '@atoms/Text';
import { FloatButton } from '@molecules/FloatButton';

import { Container, Content, Header } from './styles';
import { useTranslation } from 'react-i18next';

type CauseListNavigationScreenProp = CompositeNavigationProp<
  StackNavigationProp<OrganizationAppNavigatorParamsList, 'CauseList'>,
  StackNavigationProp<OrganizationNavigatorParamsList>
>;

export function CauseList(): JSX.Element {
  const navigation = useNavigation<CauseListNavigationScreenProp>();
  const { t } = useTranslation();
  const theme = useTheme();
  const rem = useRem();

  const handleAdd = useCallback(() => {
    navigation.navigate('AddCause');
  }, [navigation]);

  return (
    <Container>
      <Content>
        <Header>
          <Text color={theme.colors.title} fontSize={rem(theme.fonts.size.lg)} fontFamily="bold">
            {t('cause_list.title')}
          </Text>
        </Header>
      </Content>
      <FloatButton icon="add" onPress={handleAdd} />
    </Container>
  );
}
