import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import backgroundImage from '../assets/test.jpg';

/**
 * @param {object} props - Component props
 * @param {string} props.name - Name of the activity
 * @returns {JSX.Element}
 */
const ActivityCard = ({ name }) => {
  const navigation = useNavigation();

  const handlePressCard = useCallback(() => {}, []);

  return (
    <Pressable onPress={handlePressCard}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={backgroundImage} style={styles.backgroundImage} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 170,
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
  },
});

export default ActivityCard;
