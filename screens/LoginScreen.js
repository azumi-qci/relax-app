import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, ToastAndroid, ImageBackground } from 'react-native';
import { Card, Input, Button, Text, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import bgImage from '../assets/bg.jpg';

import colors from '../colors';

import { login } from '../redux/features/auth.slice';

import api from '../helpers/api';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [sending, setSending] = useState(false);

  const passwordInputRef = useRef(null);

  const handlePressNoAccount = useCallback(() => {
    navigation.navigate('Signup');
  }, []);

  const handlePressEnter = useCallback(() => {
    setSending(true);

    api
      .post('/auth/login', { ...data })
      .then(async (response) => {
        const { displayName, age, email, token } = response.data;
        // Save token on local storage
        await AsyncStorage.setItem('auth_token', token);
        // Save on context using redux
        dispatch(login({ displayName, age, email, token }));
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

  const goToPasswordInput = useCallback(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <Card containerStyle={styles.card}>
          <Card.Title>
            <Icon
              type='font-awesome-5'
              name='yin-yang'
              size={110}
              color={colors.primary}
            />
          </Card.Title>
          <Input
            disabled={sending}
            onChangeText={(value) => setData({ ...data, email: value })}
            onSubmitEditing={goToPasswordInput}
            placeholder='Correo electrónico'
            returnKeyType='next'
            style={styles.field}
            value={data.email}
          />
          <Input
            disabled={sending}
            onChangeText={(value) => setData({ ...data, password: value })}
            onSubmitEditing={handlePressEnter}
            placeholder='Contraseña'
            ref={passwordInputRef}
            returnKeyType='done'
            secureTextEntry={true}
            style={styles.field}
            value={data.password}
          />
          <Button
            title='Entrar'
            loading={sending}
            onPress={handlePressEnter}
            disabled={checkIfReadyToSend()}
            buttonStyle={styles.enterButton}
          />
        </Card>
        {/* No account container */}
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountText} onPress={handlePressNoAccount}>
            Crear cuenta
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 25,
    borderRadius: 20,
    borderWidth: 0,
    elevation: 5,
  },
  noAccountContainer: {
    display: 'flex',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  noAccountText: {
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  field: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  enterButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

export default LoginScreen;
