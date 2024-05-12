import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Listing from './src/screen/Listing';
import RecipeForm from './src/screen/RecipeForm';
import {store} from './src/reducer/index';
import {Provider} from 'react-redux';
import Detail from './src/screen/Detail';
import {setRecipeDetail} from './src/reducer/recipe.reducer';
import {Dimensions, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screen/Login';

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === 'dark' ? Colors.darker : Colors.lighter,
  };
};
export const DeviceWidth = Dimensions.get('window').width;
export const DeviceHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Listing" component={Listing} />
          <Stack.Screen name="RecipeForm" component={RecipeForm} />
          <Stack.Screen
            name="Detail"
            component={Detail}
            listeners={{
              beforeRemove: () => {
                store.dispatch(setRecipeDetail(null));
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
