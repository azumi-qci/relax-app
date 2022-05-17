import { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  ToastAndroid,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Button, Icon, Text } from '@rneui/themed';
import { useSelector } from 'react-redux';

import ActivityCard from '../components/ActivityCard';

import api from '../helpers/api';

import colors from '../colors';

import bgImage from '../assets/bg.jpg';

const HomeScreen = () => {
  const user = useSelector((state) => state.auth);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivities();
  }, []);

  /**
   * Gets the activities from the database
   */
  const getActivities = () => {
    if (!loading) {
      setLoading(true);
    }

    api
      .get('/activity', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setActivities([...response.data]);
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
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <View style={styles.headerStyle}>
          <Icon
            type='font-awesome-5'
            name='yin-yang'
            color={colors.primary}
            size={30}
          />
          <Text style={styles.headerText}>Inicio</Text>
          <Pressable
            onPress={getActivities}
            style={styles.reloadButtonContainer}
          >
            <Icon
              type='font-awesome'
              name='rotate-right'
              color={colors.white}
            />
          </Pressable>
        </View>

        {activities.length && !loading ? (
          activities.map((item) => (
            <ActivityCard name={item.name} bgURL={item.bgURL} data={item} />
          ))
        ) : (
          <Text>No hay actividades</Text>
        )}

        {loading ? (
          <ActivityIndicator size='large' color={colors.primary} />
        ) : null}

        {/* Help button */}
        <Button
          title='Necesito ayuda profesional'
          buttonStyle={styles.helpButton}
        />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 25,
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    textTransform: 'uppercase',
  },
  bgImage: {
    flex: 1,
    padding: 15,
  },
  helpButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginTop: 25,
    paddingHorizontal: 20,
  },
  bgImageCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadButtonContainer: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
