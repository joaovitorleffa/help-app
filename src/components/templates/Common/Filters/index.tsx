import { Text } from '@atoms/Text';
import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';

import { Row, Filter } from './styles';

export type Situation = 'all' | 'ended' | 'progress';

export type Type = 'all' | 'donation' | 'voluntary_work';

interface FiltersProps {
  type: Type;
  situation: Situation;
  onChangeType: (type: Type) => void;
  onChangeSituation: (situation: Situation) => void;
}

const Filters = forwardRef<Modalize, FiltersProps>(
  ({ type, situation, onChangeType, onChangeSituation }, ref) => {
    const theme = useTheme();
    const rem = useRem();

    return (
      <Portal>
        <Modalize
          adjustToContentHeight
          ref={ref}
          modalStyle={{
            backgroundColor: theme.colors.background,
          }}
          childrenStyle={{
            paddingVertical: 20,
            paddingBottom: 40,
            paddingHorizontal: theme.spacing.grid,
          }}>
          <Text fontFamily="bold" fontSize={rem(theme.fonts.size.sm)} style={{ marginBottom: 6 }}>
            Situação
          </Text>
          <Row>
            <Filter isActive={situation === 'all'} onPress={() => onChangeSituation('all')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[situation === 'all' ? 'primary' : 'text']}
                fontFamily="medium">
                Todas
              </Text>
            </Filter>
            <Filter isActive={situation === 'ended'} onPress={() => onChangeSituation('ended')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[situation === 'ended' ? 'primary' : 'text']}>
                Encerrado
              </Text>
            </Filter>
            <Filter
              isActive={situation === 'progress'}
              onPress={() => onChangeSituation('progress')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[situation === 'progress' ? 'primary' : 'text']}>
                Em andamento
              </Text>
            </Filter>
          </Row>
          <Text
            fontFamily="bold"
            fontSize={rem(theme.fonts.size.sm)}
            style={{ marginBottom: 6, marginTop: 16 }}>
            Tipo
          </Text>
          <Row>
            <Filter isActive={type === 'all'} onPress={() => onChangeType('all')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[type === 'all' ? 'primary' : 'text']}
                fontFamily="medium">
                Todas
              </Text>
            </Filter>
            <Filter isActive={type === 'donation'} onPress={() => onChangeType('donation')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[type === 'donation' ? 'primary' : 'text']}>
                Doação
              </Text>
            </Filter>
            <Filter
              isActive={type === 'voluntary_work'}
              onPress={() => onChangeType('voluntary_work')}>
              <Text
                fontSize={rem(theme.fonts.size.sm)}
                color={theme.colors[type === 'voluntary_work' ? 'primary' : 'text']}>
                Trabalho voluntário
              </Text>
            </Filter>
          </Row>
        </Modalize>
      </Portal>
    );
  },
);

Filters.displayName = 'Filters';

export { Filters };
