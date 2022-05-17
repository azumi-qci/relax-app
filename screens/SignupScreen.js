import { useCallback, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import colors from '../colors';

import bgImage from '../assets/bg.jpg';
import { Icon } from '@rneui/base';

const SignupScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    email: '',
    age: 0,
    password: '',
    repeatPassword: '',
  });

  const handlePressAlreadyRegisted = useCallback(() => {
    navigation.goBack();
  }, []);

  const handlePressEnter = useCallback(() => {
    console.log(data);
  }, [data]);

  const checkIfReadyToSend = useCallback(() => {
    return !data.email || !data.age || !data.password || !data.repeatPassword;
  }, [data]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <Card containerStyle={styles.card}>
          <Icon
            type='font-awesome-5'
            name='yin-yang'
            size={110}
            color={colors.primary}
          />
          <Input
            onChangeText={(value) => setData({ ...data, email: value })}
            placeholder='Correo electrónico'
            value={data.email}
          />
          <Input
            onChangeText={(value) =>
              setData({ ...data, age: parseInt(value, 10) })
            }
            placeholder='Edad'
            keyboardType='numeric'
            value={data.age}
          />
          <Input
            onChangeText={(value) => setData({ ...data, password: value })}
            placeholder='Contraseña'
            secureTextEntry={true}
            value={data.password}
          />
          <Input
            onChangeText={(value) =>
              setData({ ...data, repeatPassword: value })
            }
            placeholder='Repetir contraseña'
            secureTextEntry={true}
            value={data.repeatPassword}
          />
          <Button
            disabled={checkIfReadyToSend()}
            onPress={handlePressEnter}
            title='Registrarse'
            buttonStyle={styles.enterButton}
          />
        </Card>
        <View style={styles.noAccountContainer}>
          <Text
            style={styles.noAccountText}
            onPress={handlePressAlreadyRegisted}
          >
            Ya tengo una cuenta
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
    elevation: 10,
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
  enterButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});

export default SignupScreen;
