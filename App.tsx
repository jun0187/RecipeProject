import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Listing from './src/screen/Listing';
import AddRecipe from './src/screen/AddRecipe';
import {store} from './src/reducer/index';
import {Provider} from 'react-redux';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Listing">
          <Stack.Screen name="Listing" component={Listing} />
          <Stack.Screen name="AddRecipe" component={AddRecipe} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
