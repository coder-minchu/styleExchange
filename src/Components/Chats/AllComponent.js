import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { List, Avatar } from 'react-native-paper';
import socketServcies from '../../utils/socketServcies';
import { AppColor } from '../../utils/AppColor';

const AllComponent = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      socketServcies.emit('all_conversation_list');
      socketServcies.on('all_conversation_list_from_server', (list) => {
        setChats(list.filterArray);
        setIsLoading(false);
      });
    }, [])
  );

  const handleChatPress = (chatItem) => {
    navigation.navigate('ChatDetailsScreen', { user_Id: chatItem?.userId._id });
  };

  const renderChatItem = ({ item }) => {
    return (
      <List.Item
        title={item.userId.name ? item.userId.name : item.userId.phoneNumber}
        description={item.message}
        onPress={() => handleChatPress(item)}
        titleStyle={{ fontWeight: 'bold' }}
        descriptionStyle={{ color: 'gray' }}
        left={(props) => <Avatar.Image {...props} source={{ uri: 'https://source.unsplash.com/user/c_v_r/1900x800' }} />}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color={AppColor.blueViolet} />
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllComponent;
