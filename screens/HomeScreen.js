import { StyleSheet, ScrollView } from 'react-native';

import ActivityCard from '../components/ActivityCard';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <ActivityCard name='Actividad 1' />
      <ActivityCard name='Actividad 2' />
      <ActivityCard name='Actividad 3' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
