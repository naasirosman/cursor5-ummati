import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { Text } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

// Mock data for recent searches
const RECENT_SEARCHES = [
  'Islamic art',
  'Halal recipes',
  'Ramadan tips',
  'Islamic history',
  'Quran recitation',
];

// Mock data for suggested content
const SUGGESTED_CONTENT = [
  {
    id: '1',
    title: 'Top 10 Islamic Art Pieces',
    author: 'ArtEnthusiast',
    image: 'https://picsum.photos/seed/1/200/200',
  },
  {
    id: '2',
    title: 'Easy Halal Recipes for Beginners',
    author: 'HalalChef',
    image: 'https://picsum.photos/seed/2/200/200',
  },
  {
    id: '3',
    title: 'Understanding Islamic History',
    author: 'HistoryBuff',
    image: 'https://picsum.photos/seed/3/200/200',
  },
  // Add more suggested content items
];

const RecentSearchItem = ({ item, colorScheme }) => (
  <TouchableOpacity style={styles.recentSearchItem}>
    <FontAwesome name="history" size={16} color={colorScheme === 'dark' ? '#888' : '#666'} />
    <Text style={[styles.recentSearchText, colorScheme === 'dark' && styles.darkText]}>{item}</Text>
  </TouchableOpacity>
);

const SuggestedContentItem = ({ item, colorScheme }) => (
  <TouchableOpacity style={[styles.suggestedContentItem, colorScheme === 'dark' && styles.darkSuggestedContentItem]}>
    <Image source={{ uri: item.image }} style={styles.suggestedContentImage} />
    <View style={styles.suggestedContentInfo}>
      <Text style={[styles.suggestedContentTitle, colorScheme === 'dark' && styles.darkText]}>{item.title}</Text>
      <Text style={[styles.suggestedContentAuthor, colorScheme === 'dark' && styles.darkSubText]}>{item.author}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <View style={[styles.header, colorScheme === 'dark' && styles.darkHeader]}>
        <Text style={[styles.headerTitle, colorScheme === 'dark' && styles.darkText]}>Search</Text>
      </View>
      <View style={styles.content}>
        <View style={[styles.searchBarContainer, colorScheme === 'dark' && styles.darkSearchBarContainer]}>
          <FontAwesome name="search" size={20} color={colorScheme === 'dark' ? '#888' : '#666'} />
          <TextInput
            style={[styles.searchBar, colorScheme === 'dark' && styles.darkSearchBar]}
            placeholder="Search Ummati"
            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.recentSearchesContainer}>
          <Text style={[styles.sectionTitle, colorScheme === 'dark' && styles.darkText]}>Recent Searches</Text>
          <FlatList
            data={RECENT_SEARCHES}
            renderItem={({ item }) => <RecentSearchItem item={item} colorScheme={colorScheme} />}
            keyExtractor={(item) => item}
          />
        </View>
        <View style={styles.suggestedContentContainer}>
          <Text style={[styles.sectionTitle, colorScheme === 'dark' && styles.darkText]}>Suggested Content</Text>
          <FlatList
            data={SUGGESTED_CONTENT}
            renderItem={({ item }) => <SuggestedContentItem item={item} colorScheme={colorScheme} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkHeader: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  darkSearchBarContainer: {
    backgroundColor: '#333',
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
  },
  darkSearchBar: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recentSearchesContainer: {
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recentSearchText: {
    marginLeft: 8,
    fontSize: 16,
  },
  suggestedContentContainer: {
    flex: 1,
  },
  suggestedContentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  darkSuggestedContentItem: {
    backgroundColor: '#1e1e1e',
  },
  suggestedContentImage: {
    width: 80,
    height: 80,
  },
  suggestedContentInfo: {
    flex: 1,
    padding: 8,
  },
  suggestedContentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  suggestedContentAuthor: {
    fontSize: 14,
    color: '#666',
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
});