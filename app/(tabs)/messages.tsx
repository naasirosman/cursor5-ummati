import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { Text } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

// Mock data for conversations
const CONVERSATIONS = [
  {
    id: '1',
    user: 'John Doe',
    lastMessage: 'Hey, how are you?',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    timestamp: '2m ago',
    unread: 2,
  },
  {
    id: '2',
    user: 'Jane Smith',
    lastMessage: 'Did you see the latest post?',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    timestamp: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    user: 'Ahmed Ali',
    lastMessage: 'Thanks for the Eid wishes!',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    timestamp: '3h ago',
    unread: 1,
  },
  {
    id: '4',
    user: 'Fatima Hassan',
    lastMessage: 'Can you share that recipe?',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    timestamp: '5h ago',
    unread: 0,
  },
  {
    id: '5',
    user: 'Omar Khan',
    lastMessage: 'Jummah prayer at 1:30 PM tomorrow',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '6',
    user: 'Aisha Patel',
    lastMessage: 'How was the Islamic conference?',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    timestamp: '2d ago',
    unread: 3,
  },
  {
    id: '7',
    user: 'Yusuf Adams',
    lastMessage: 'Ramadan Mubarak, brother!',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    timestamp: '3d ago',
    unread: 0,
  },
  {
    id: '8',
    user: 'Zainab Ahmed',
    lastMessage: 'Can you proofread my article?',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    timestamp: '4d ago',
    unread: 1,
  },
  {
    id: '9',
    user: 'Ibrahim Malik',
    lastMessage: 'Don\'t forget about tonight\'s Quran study',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    timestamp: '5d ago',
    unread: 0,
  },
  {
    id: '10',
    user: 'Amina Hussain',
    lastMessage: 'The charity event was a success!',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    timestamp: '1w ago',
    unread: 0,
  },
  {
    id: '11',
    user: 'Mustafa Al-Sayed',
    lastMessage: 'Can you help with Arabic translations?',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    timestamp: '1w ago',
    unread: 2,
  },
  {
    id: '12',
    user: 'Layla Mahmoud',
    lastMessage: 'Check out this new halal restaurant',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    timestamp: '2w ago',
    unread: 0,
  }
];

// Mock data for messages in a conversation
const MESSAGES = [
  {
    id: '1',
    text: 'Hey, how are you?',
    sender: 'John Doe',
    timestamp: '2:30 PM',
    isSent: false,
  },
  {
    id: '2',
    text: 'I\'m good, thanks! How about you?',
    sender: 'Me',
    timestamp: '2:31 PM',
    isSent: true,
  },
  {
    id: '3',
    text: 'I\'m doing well too. Did you see the latest Ummati update?',
    sender: 'John Doe',
    timestamp: '2:33 PM',
    isSent: false,
  },
  // Add more mock messages here
];

const ConversationItem = ({ item, colorScheme }) => (
  <TouchableOpacity style={[styles.conversationItem, colorScheme === 'dark' && styles.darkConversationItem]}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.conversationInfo}>
      <Text style={[styles.username, colorScheme === 'dark' && styles.darkText]}>{item.user}</Text>
      <Text style={[styles.lastMessage, colorScheme === 'dark' && styles.darkSubText]} numberOfLines={1}>{item.lastMessage}</Text>
    </View>
    <View style={styles.conversationMeta}>
      <Text style={[styles.timestamp, colorScheme === 'dark' && styles.darkSubText]}>{item.timestamp}</Text>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const MessageBubble = ({ message, colorScheme }) => (
  <View style={[
    styles.messageBubble,
    message.isSent ? styles.sentBubble : styles.receivedBubble,
    colorScheme === 'dark' && (message.isSent ? styles.darkSentBubble : styles.darkReceivedBubble)
  ]}>
    <Text style={[styles.messageText, colorScheme === 'dark' && styles.darkText]}>{message.text}</Text>
    <Text style={[styles.messageTimestamp, colorScheme === 'dark' && styles.darkSubText]}>{message.timestamp}</Text>
  </View>
);

export default function MessagesScreen() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const colorScheme = useColorScheme();

  const renderConversationList = () => (
    <FlatList
      data={CONVERSATIONS}
      renderItem={({ item }) => <ConversationItem item={item} colorScheme={colorScheme} />}
      keyExtractor={(item) => item.id}
    />
  );

  const renderConversation = () => (
    <View style={styles.conversationContainer}>
      <FlatList
        data={MESSAGES}
        renderItem={({ item }) => <MessageBubble message={item} colorScheme={colorScheme} />}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={[styles.inputContainer, colorScheme === 'dark' && styles.darkInputContainer]}>
        <TextInput
          style={[styles.input, colorScheme === 'dark' && styles.darkInput]}
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder="Type a message..."
          placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
        />
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome name="send" size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <View style={[styles.header, colorScheme === 'dark' && styles.darkHeader]}>
        <Text style={[styles.headerTitle, colorScheme === 'dark' && styles.darkText]}>Messages</Text>
      </View>
      <View style={styles.content}>
        {activeConversation ? renderConversation() : renderConversationList()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, // Add padding to the top
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  darkConversationItem: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  conversationInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  conversationMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  conversationContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  darkSentBubble: {
    backgroundColor: '#056162',
  },
  darkReceivedBubble: {
    backgroundColor: '#262D31',
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
  },
  darkInputContainer: {
    backgroundColor: '#1e1e1e',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  darkText: {
    color: '#fff',
  },
  darkSubText: {
    color: '#aaa',
  },
  content: {
    flex: 1,
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
});