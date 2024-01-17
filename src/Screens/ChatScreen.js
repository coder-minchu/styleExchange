// ChatScreen.js

import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ChatScreen = ({ route }) => {
    const { chatItem } = route.params;

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const renderMessage = ({ item }) => (
        <View style={styles.messageItem}>
            <Text>{item.sender}:</Text>
            <Text>{item.message}</Text>
        </View>
    );

    const handleSend = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = { id: messages.length + 1, sender: 'You', message: inputMessage };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChangeText={(text) => setInputMessage(text)}
                />
                <TouchableOpacity onPress={handleSend}>
                    <Text style={styles.sendButton}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default ChatScreen;
