import { createStackNavigator } from '@react-navigation/stack';
import { PersonNavigatorParamsList } from '@routes/types';
import { Home } from '@screens/Person/Home';
import React from 'react';

const Stack = createStackNavigator<PersonNavigatorParamsList>();

export function PersonRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
