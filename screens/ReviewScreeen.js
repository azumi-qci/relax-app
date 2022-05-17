import { View, StyleSheet, ToastAndroid, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonGroup, Text } from '@rneui/base';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@rneui/themed';

import api from '../helpers/api';

import colors from '../colors';

import bgImage from '../assets/bg.jpg';

const ReviewScreen = () => {
  const route = useRoute();
  const user = useSelector((state) => state.auth);

  const [scoreIndex, setScoreIndex] = useState(-1);

  const { name, data } = route.params;

  const handlePressEvaluation = useCallback(
    (value) => {
      if (scoreIndex > -1) {
        return;
      }

      api
        .post(
          '/review',
          {
            activity: data,
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
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <View style={styles.headerContainer}>
          <Icon
            type='font-awesome-5'
            name='yin-yang'
            color={colors.primary}
            size={30}
          />
          <Text h3={true} style={styles.headerText}>
            {name}
          </Text>
        </View>
        <Text style={styles.reviewText}>Evaluación</Text>
        <ButtonGroup
          buttons={['1', '2', '3', '4', '5']}
          onPress={handlePressEvaluation}
          selectedIndex={scoreIndex}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  headerText: {
    color: colors.white,
    paddingLeft: 15,
  },
  bgImage: {
    flex: 1,
    padding: 15,
  },
  reviewText: {
    color: colors.white,
    marginTop: 'auto',
  },
});

export default ReviewScreen;
