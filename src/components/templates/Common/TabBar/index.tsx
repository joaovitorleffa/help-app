import React from 'react';
import { useRem } from 'responsive-native';
import { useTheme } from 'styled-components';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Container, Content, Button } from './styles';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element {
  const theme = useTheme();
  const rem = useRem();

  return (
    <Container>
      <Content>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true, params: {} });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Button
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: theme.colors.title_secondary,
                  size: rem(1.4),
                })}
            </Button>
          );
        })}
      </Content>
    </Container>
  );
}
