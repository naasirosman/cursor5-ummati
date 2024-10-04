import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, FlatList, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { Text } from '../../components/Themed';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SHORTS } from '../../data/shorts';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const ShortVideo = ({ item, isVisible, bottomInset }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
      }
    }
  }, [isVisible]);

  return (
    <View style={[styles.shortContainer, { height: WINDOW_HEIGHT - bottomInset }]}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUri }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={false}
      />
      <View style={styles.overlay}>
        <View style={styles.bottomOverlay}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={styles.sideOverlay}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="heart" size={28} color="white" />
            <Text style={styles.iconText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="comment" size={28} color="white" />
            <Text style={styles.iconText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="share" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function ShortsScreen() {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <FlatList
        data={SHORTS}
        renderItem={({ item }) => <ShortVideo item={item} isVisible={isFocused} bottomInset={insets.bottom} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={WINDOW_HEIGHT - insets.bottom}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  shortContainer: {
    width: WINDOW_WIDTH,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bottomOverlay: {
    padding: 20,
    paddingBottom: 50,
  },
  sideOverlay: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    color: 'white',
    marginTop: 5,
  },
});