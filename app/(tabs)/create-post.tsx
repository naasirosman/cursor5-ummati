import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function CreatePostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});