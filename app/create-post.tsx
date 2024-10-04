import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Stack } from 'expo-router';

export default function CreatePostScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Post' }} />
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