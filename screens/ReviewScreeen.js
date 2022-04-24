import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ReviewScreen = () => {
  const route = useRoute();

  const { name } = route.params;

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default ReviewScreen;
