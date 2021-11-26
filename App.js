import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import ChatScreen from './src/components/screens/ChatSreen';
import LoginScreen from './src/components/screens/LoginScreen';
import RegisterScreen from './src/components/screens/RegisterScreen';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={RegisterScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
