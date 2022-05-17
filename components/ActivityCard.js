import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import defaulImage from '../assets/test.jpg';

/**
 * @param {object} props - Component props
 * @param {string} props.name - Name of the activity
 * @param {string} props.bgURL - URI of the background image
 * @param {object} props.data - Complete data of the activity
 * @returns {JSX.Element}
 */
const ActivityCard = ({ name, bgURL, data }) => {
  const navigation = useNavigation();

  const handlePressCard = useCallback(() => {
    navigation.navigate('Review', { data });
  }, []);

  return (
    <Pressable onPress={handlePressCard}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={bgURL ? { uri: bgURL } : defaulImage}
            style={styles.backgroundImage}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 130,
  },
  innerContainer: {
    display: 'flex',
  },
  backgroundImage: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  name: {
    bottom: 5,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    right: 8,
    fontSize: 30,
    textShadowColor: 'black',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
});

export default ActivityCard;
