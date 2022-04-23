import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRef, useCallback, useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Card, Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import api from '../helpers/api';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [sending, setSending] = useState(false);

  const passwordInputRef = createRef(null);

  const handlePressNoAccount = useCallback(() => {
    navigation.navigate('Signup');
  }, []);

  const handlePressEnter = useCallback(() => {
    setSending(true);

    api
      .post('/auth/login', { ...data })
      .then(async (response) => {
        const { displayName, email, token } = response.data;
        // Save token on local storage
        await AsyncStorage.setItem('auth_token', token);
        // Redirect to home screen
        navigation.navigate('Home');
      })
      .catch((error) => {
        if (!error.response) {
          return ToastAndroid.show(
            'No se pudo conectar al servidor',
            ToastAndroid.SHORT
          );
        }

        switch (error.response.status) {
          case 401:
            ToastAndroid.show(
              'Las credenciales ingresadas no son válidas',
              ToastAndroid.SHORT
            );
            break;

          default:
            ToastAndroid.show('Error en el servidor', ToastAndroid.SHORT);
            break;
        }
      })
      .finally(() => setSending(false));
  }, [data]);

  const checkIfReadyToSend = useCallback(() => {
    return !data.email || !data.password;
  }, [data]);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>Iniciar sesión</Card.Title>
        <Card.Divider />
        <Input
          disabled={sending}
          onChangeText={(value) => setData({ ...data, email: value })}
          placeholder='Correo electrónico'
          value={data.email}
        />
        <Input
          ref={passwordInputRef}
          disabled={sending}
          onChangeText={(value) => setData({ ...data, password: value })}
          placeholder='Contraseña'
          secureTextEntry={true}
          value={data.password}
        />
        <Button
          title='Entrar'
          loading={sending}
          onPress={handlePressEnter}
          disabled={checkIfReadyToSend()}
        />
      </Card>
      {/* No account container */}
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText} onPress={handlePressNoAccount}>
          Crear cuenta
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  card: {
    marginBottom: 25,
  },
  noAccountContainer: {
    display: 'flex',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  noAccountText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default LoginScreen;
