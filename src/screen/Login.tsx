import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DeviceHeight, DeviceWidth, backgroundStyle} from '../../App';
import {loginMock} from '../recipe.mock';

const Login = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const styles = useStyle();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onPressLogin = () => {
    if (username && password) {
      if (
        loginMock.find(i => i.username === username && i.password === password)
      ) {
        navigation.navigate('Listing');
      } else {
        Alert.alert('Incorrect username/password\nPlease try again.');
      }
    }
  };
  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.listingContainer}>
        <Text style={styles.welcome}>Welcome</Text>
        <TextInput
          style={styles.item}
          placeholder="Enter Username"
          onChangeText={setUsername}
          defaultValue={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.item}
          placeholder="Enter Password"
          onChangeText={setPassword}
          defaultValue={password}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button title="Login" onPress={onPressLogin} />
      </View>
    </SafeAreaView>
  );
};
const useStyle = (deviceWidth = DeviceWidth, deviceHeight = DeviceHeight) =>
  StyleSheet.create({
    listingContainer: {
      position: 'absolute',
      top: deviceHeight * 0.25,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Cochin',
    },
    item: {
      height: 40,
      borderWidth: 1,
      marginVertical: 12,
      width: deviceWidth - deviceWidth * 0.15,
      padding: 10,
    },
  });
export default Login;
