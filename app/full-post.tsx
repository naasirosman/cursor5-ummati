import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';

const FullPost = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const post = JSON.parse(params.post as string);

  const PostMedia = ({ images, video }) => {
    if (video) {
      return (
        <Video
          source={{ uri: video }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      );
    }

    if (images && images.length > 0) {
      return <Image source={{ uri: images[0] }} style={styles.media} />;
    }

    return null;
  };

  return (
    <ScrollView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, colorScheme === 'dark' && styles.darkText]}>Post</Text>
      </View>
      <View style={[styles.postContainer, colorScheme === 'dark' && styles.darkPostContainer]}>
        <View style={styles.authorInfo}>
          <Text style={[styles.author, colorScheme === 'dark' && styles.darkText]}>{post.author}</Text>
          <Text style={[styles.username, colorScheme === 'dark' && styles.darkUsername]}>@{post.username}</Text>
        </View>
        <Text style={[styles.content, colorScheme === 'dark' && styles.darkText]}>{post.content}</Text>
        <PostMedia images={post.images} video={post.video} />
        <View style={styles.interactions}>
          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesome name="heart-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
            <Text style={[styles.interactionText, colorScheme === 'dark' && styles.darkText]}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesome name="comment-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
            <Text style={[styles.interactionText, colorScheme === 'dark' && styles.darkText]}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesome name="bookmark-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  darkPostContainer: {
    backgroundColor: '#1e1e1e',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  media: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 8,
    fontSize: 14,
  },
  darkText: {
    color: '#fff',
  },
  darkUsername: {
    color: '#aaa',
  },
});

export default FullPost;