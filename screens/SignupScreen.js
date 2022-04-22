import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

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
      <Card containerStyle={styles.card}>
        <Card.Title>Registrarse en Relax</Card.Title>
        <Card.Divider />
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
          onChangeText={(value) => setData({ ...data, repeatPassword: value })}
          placeholder='Repetir contraseña'
          secureTextEntry={true}
          value={data.repeatPassword}
        />
        <Button
          disabled={checkIfReadyToSend()}
          onPress={handlePressEnter}
          title='Registrarse'
        />
      </Card>
      <View style={styles.noAccountContainer}>
        <Text style={styles.noAccountText} onPress={handlePressAlreadyRegisted}>
          Ya tengo una cuenta
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
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

export default SignupScreen;
