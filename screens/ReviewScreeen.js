import { View, StyleSheet, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ButtonGroup, Text } from '@rneui/base';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import api from '../helpers/api';

const ReviewScreen = () => {
  const route = useRoute();
  const user = useSelector((state) => state.auth);

  const [scoreIndex, setScoreIndex] = useState(-1);

  const { name } = route.params;

  const handlePressEvaluation = useCallback(
    (value) => {
      if (scoreIndex > -1) {
        return;
      }

      api
        .post(
          '/review',
          {
            activity: name,
            score: value + 1,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          setScoreIndex(value);
          // Show message
          ToastAndroid.show('Gracias por la evaluación', ToastAndroid.LONG);
        })
        .catch((error) => {
          console.warn(error);

          if (!error.response) {
            return ToastAndroid.show(
              'No se pudo conectar al servidor',
              ToastAndroid.SHORT
            );
          }

          switch (error.response.status) {
            case 401:
              ToastAndroid.show('Usuario sin autorización', ToastAndroid.SHORT);
              break;

            default:
              ToastAndroid.show('Error en el servidor', ToastAndroid.SHORT);
              break;
          }
        });
    },
    [name]
  );

  return (
    <View style={styles.container}>
      <Text h3={true} style={styles.title}>
        {name}
      </Text>
      <Text>Evaluación</Text>
      <ButtonGroup
        buttons={['1', '2', '3', '4', '5']}
        onPress={handlePressEvaluation}
        selectedIndex={scoreIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    marginBottom: 25,
  },
});

export default ReviewScreen;
