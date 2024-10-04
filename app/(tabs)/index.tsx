import React, { useState, useRef } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, Animated, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { Video } from 'expo-av';
import { SHORTS } from '../../data/shorts';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Function to calculate time difference
const getTimeSince = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}w`;
  }
};

// Updated mock data for posts
const POSTS = [
  {
    id: '1',
    author: 'John Doe',
    username: 'johndoe',
    content: 'This is my first text-only post on Ummati!',
    likes: 15,
    comments: 3,
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: '2',
    author: 'Jane Smith',
    username: 'janesmith',
    content: 'My organized workspace. Ready for a productive day! #WorkFromHome',
    images: ['https://picsum.photos/seed/2/400/300'],
    likes: 32,
    comments: 7,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: '3',
    author: 'Ahmed Ali',
    username: 'ahmedali',
    content: 'Nature\'s beauty never fails to inspire. Captured these stunning views on my hike today.',
    images: [
      'https://picsum.photos/seed/3/400/300',
      'https://picsum.photos/seed/4/400/300',
      'https://picsum.photos/seed/5/400/300',
    ],
    likes: 24,
    comments: 5,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '4',
    author: 'Sarah Johnson',
    username: 'sarahj',
    content: 'Just started a new painting project. Can\'t wait to share the results!',
    images: ['https://picsum.photos/seed/6/400/300', 'https://picsum.photos/seed/7/400/300'],
    likes: 45,
    comments: 8,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '5',
    author: 'Michael Brown',
    username: 'mikebrown',
    content: 'Attended an amazing tech conference today. So much to learn!',
    likes: 37,
    comments: 6,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
  {
    id: '6',
    author: 'Emily Davis',
    username: 'emilyd',
    content: 'Sunset at the beach. Nature\'s beauty never fails to amaze me.',
    images: ['https://picsum.photos/seed/8/400/300'],
    likes: 89,
    comments: 12,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '7',
    author: 'David Wilson',
    username: 'davidw',
    content: 'Just finished my first marathon! Feeling accomplished and exhausted.',
    images: [
      'https://picsum.photos/seed/9/400/300',
      'https://picsum.photos/seed/10/400/300',
      'https://picsum.photos/seed/11/400/300',
      'https://picsum.photos/seed/12/400/300'
    ],
    likes: 156,
    comments: 28,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: '8',
    author: 'Olivia Taylor',
    username: 'oliviat',
    content: 'New recipe experiment: vegan sushi rolls. They turned out delicious!',
    images: ['https://picsum.photos/seed/13/400/300', 'https://picsum.photos/seed/14/400/300'],
    likes: 67,
    comments: 15,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
  },
  {
    id: '9',
    author: 'Daniel Lee',
    username: 'danlee',
    content: 'Just adopted this cute little puppy. Meet Max!',
    images: ['https://picsum.photos/seed/15/400/300'],
    likes: 201,
    comments: 42,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: '10',
    author: 'Sophia Martinez',
    username: 'sophiam',
    content: 'Thoughts on the latest bestseller? I found it quite intriguing.',
    likes: 28,
    comments: 9,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '11',
    author: 'William Anderson',
    username: 'willa',
    content: 'Hiked to the top of Mount Rainier today. The view was breathtaking!',
    images: [
      'https://picsum.photos/seed/16/400/300',
      'https://picsum.photos/seed/17/400/300',
      'https://picsum.photos/seed/18/400/300'
    ],
    likes: 132,
    comments: 23,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
  },
  {
    id: '12',
    author: 'Emma Thompson',
    username: 'emmat',
    content: 'Just launched my new website! Check it out and let me know what you think.',
    images: ['https://picsum.photos/seed/19/400/300', 'https://picsum.photos/seed/20/400/300'],
    likes: 95,
    comments: 31,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '13',
    author: 'James Wilson',
    username: 'jamesw',
    content: 'Celebrating 5 years at my company today. Time flies when you love what you do!',
    likes: 87,
    comments: 19,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
  },
];

// Add this to your POSTS array
const SHORTS_POSTS = SHORTS.map(short => ({
  id: `short-${short.id}`,
  author: short.user,
  username: short.user.toLowerCase(),
  content: short.description,
  video: short.videoUri,
  likes: short.likes,
  comments: short.comments,
  timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within the last week
}));

POSTS.push(...SHORTS_POSTS); // Add the shorts posts to your existing posts

const PostMedia = ({ images, video, colorScheme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (video) {
    return (
      <View style={[styles.mediaContainer, colorScheme === 'dark' && styles.darkPost]}>
        <Video
          source={{ uri: video }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={false}
        />
      </View>
    );
  }

  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return <Image source={{ uri: images[0] }} style={[styles.singleImage, colorScheme === 'dark' && styles.darkImage]} />;
  }

  return (
    <View style={styles.mediaContainer}>
      <Swiper
        style={styles.imageCarousel}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        onIndexChanged={setCurrentIndex}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={[styles.slideImage, colorScheme === 'dark' && styles.darkImage]} />
        ))}
      </Swiper>
      <View style={styles.paginationContainer}>
        <View style={[styles.paginationTrack, colorScheme === 'dark' && styles.darkPaginationTrack]}>
          <View 
            style={[
              styles.paginationIndicator, 
              colorScheme === 'dark' && styles.darkPaginationIndicator,
              { width: `${(1 / images.length) * 100}%`, left: `${(currentIndex / images.length) * 100}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const Post = ({ item, colorScheme }) => {
  return (
    <View style={[styles.post, colorScheme === 'dark' && styles.darkPost]}>
      <View style={[styles.postHeader, colorScheme === 'dark' && styles.darkPost]}>
        <View style={[styles.authorInfo, colorScheme === 'dark' && styles.darkPost]}>
          <Text style={[styles.author, colorScheme === 'dark' && styles.darkText]}>{item.author}</Text>
          <Text style={[styles.username, colorScheme === 'dark' && styles.darkUsername]}>@{item.username}</Text>
        </View>
        <Text style={[styles.timestamp, colorScheme === 'dark' && styles.darkTimestamp]}>{getTimeSince(item.timestamp)}</Text>
      </View>
      <View style={[styles.contentContainer, colorScheme === 'dark' && styles.darkPost]}>
        <Text style={[styles.content, colorScheme === 'dark' && styles.darkText]}>{item.content}</Text>
      </View>
      <PostMedia images={item.images} video={item.video} colorScheme={colorScheme} />
      <View style={[styles.interactions, colorScheme === 'dark' && styles.darkPost]}>
        <TouchableOpacity style={styles.interactionButton}>
          <FontAwesome name="heart-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
          <Text style={[styles.interactionText, colorScheme === 'dark' && styles.darkInteractionText]}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <FontAwesome name="comment-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
          <Text style={[styles.interactionText, colorScheme === 'dark' && styles.darkInteractionText]}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <FontAwesome name="bookmark-o" size={24} color={colorScheme === 'dark' ? "#ffffff" : "#333"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <View style={[styles.header, colorScheme === 'dark' && styles.darkHeader]}>
        <Text style={[styles.title, colorScheme === 'dark' && styles.darkText]}>Ummati</Text>
        <Link href="/create-post" asChild>
          <TouchableOpacity style={styles.createPostButton}>
            <FontAwesome name="plus" size={24} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
      <FlatList
        data={POSTS}
        renderItem={({ item }) => <Post item={item} colorScheme={colorScheme} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createPostButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingTop: 10,
    paddingHorizontal: 10, // Add horizontal padding for the entire list
  },
  post: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderWidth: 1,  // Add this line
    borderColor: '#e0e0e0',  // Add this line
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: '100%', // Change to 100% width
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
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
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  imageCarousel: {
    height: '100%',
  },
  slideWrapper: {
    width: WINDOW_WIDTH,
    height: '100%',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  mediaContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    height: 2,
  },
  paginationTrack: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  paginationIndicator: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
    position: 'absolute',
  },
  darkPaginationTrack: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  darkPaginationIndicator: {
    backgroundColor: '#000',
  },
  singleImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 12,
  },
  darkContainer: {
    backgroundColor: '#000000', // Keep the background black
  },
  darkHeader: {
    backgroundColor: '#000000', // Keep the header black
    borderBottomColor: '#333',
  },
  darkPost: {
    backgroundColor: '#1e1e1e', // Slightly lighter than pure black for post background
    shadowColor: "#000",
    borderColor: '#333',
  },
  darkText: {
    color: '#ffffff',
  },
  darkUsername: {
    color: '#a0a0a0', // Lighter gray for username in dark mode
  },
  darkTimestamp: {
    color: '#808080', // Medium gray for timestamp
  },
  darkInteractionText: {
    color: '#ffffff',
  },
  darkPaginationTrack: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  darkPaginationIndicator: {
    backgroundColor: '#000',
  },
  contentContainer: {
    marginBottom: 8,
  },
  darkImage: {
    backgroundColor: '#1e1e1e',
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
});