import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { List, Avatar } from 'react-native-paper';
import socketServcies from '../../utils/socketServcies';

const AllComponent = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  // console.log("🚀 ~ AllComponent ~ chats:", chats)

  useFocusEffect(
    useCallback(() => {
      socketServcies.emit('all_conversation_list');
      socketServcies.on('all_conversation_list_from_server', (list) => {
        console.log("🚀 ~ socketServcies.on ~ list:", list);
        setChats(list.array);
      });
    }, [])
  );

  const handleChatPress = (chatItem) => {
    console.log("🚀 ~ handleChatPress ~ chatItem:", chatItem)
    // Navigate to the chat screen with the selected chat item 
    navigation.navigate('ChatDetailsScreen', { user_Id: chatItem?.user1_id });
  };

  const renderChatItem = ({ item }) => {
    console.log("🚀 ~ renderChatItem ~ item:", item.userId)
    return (
      <List.Item
        title={item.userId.name}
        description={item.message}
        onPress={() => handleChatPress(item)}
        titleStyle={{ fontWeight: 'bold' }}
        descriptionStyle={{ color: 'gray' }}
        left={(props) => <Avatar.Image {...props} source={{ uri: 'https://source.unsplash.com/user/c_v_r/1900x800' }} />}
      />
    )
  };

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default AllComponent;
