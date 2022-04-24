import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ReviewScreen from './screens/ReviewScreeen';

import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
              title: 'Inicio',
            }}
          />
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Signup'
            component={SignupScreen}
            options={{ title: 'Crear cuenta' }}
          />
          <Stack.Screen
            name='Review'
            component={ReviewScreen}
            options={{ title: 'Evaluar actividad' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
