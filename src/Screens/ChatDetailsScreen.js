import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import socketServcies from '../utils/socketServcies';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatDetailsScreen = ({ route }) => {
    let { user_Id } = route.params;
    console.log("🚀 ~ ChatDetailsScreen ~ user_Id:", user_Id)
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (user_Id) {
            socketServcies.emit('client_connect_to_the_user', user_Id);

            socketServcies.on('conversation_info', (receivedConversation) => {
                console.log("🚀 ~ socketServcies.on ~ receivedConversation:", receivedConversation);
                if (receivedConversation.allConverstionMessages) {
                    setMessages(receivedConversation.allConverstionMessages);
                }
                setLoading(false);
            });
        }
    }, [user_Id]);

    useEffect(() => {
        socketServcies.on('chat_from_server', (receivedMessage) => {
            console.log('Received message from server:', receivedMessage);

            const formattedMessage = {
                _id: receivedMessage.msg._id,
                text: receivedMessage.msg.text,
                createdAt: new Date(receivedMessage.msg.createdAt),
                user: {
                    _id: receivedMessage.msg.user._id,
                    name: receivedMessage.msg.user.name,
                },
            };

            setMessages((prevMessages) => GiftedChat.append(prevMessages, [formattedMessage]));
        });

        return () => {
            socketServcies.removeListener('chat_from_server');
        };
    }, [user_Id, messages]);

    const onSend = useCallback(
        (newMessages = []) => {
            const latestMessage = newMessages[0];
            console.log('🚀 ~ onSend ~ latestMessage:', latestMessage);
            socketServcies.emit(
                'msg_from_client',
                user_Id,
                {
                    _id: latestMessage._id,
                    text: latestMessage.text,
                    createdAt: latestMessage.createdAt,
                    user: {
                        _id: latestMessage.user._id,
                        name: latestMessage.user.name,
                    },
                },
            );
        },
        [user_Id],
    );

    const fetchUserDetails = async () => {
        let details = await AsyncStorage.getItem('UserDetails');
        let userParse = JSON.parse(details);
        console.log("🚀 ~ fetchUserDetails ~ userParse:", userParse)
        setUserDetails(userParse)
    }

    if (loading) {
        // Display a loader while messages are being fetched
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0084FF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <GiftedChat
                messages={messages.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: userDetails._id,
                    name: userDetails.name,
                    // avatar: userDetails.avatar || 'https://placeimg.com/140/140/any',
                }}
                renderBubble={props => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: '#0084FF',
                            },
                            left: {
                                backgroundColor: '#FFFFFF',
                            },
                        }}
                    />
                )}
                renderInputToolbar={props => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            backgroundColor: '#FFFFFF',
                            // borderTopWidth: 1,
                            borderTopColor: '#E0E0E0',
                        }}
                    />
                )}
                renderSend={props => (
                    <Send {...props}>
                        <View style={{ marginRight: 10, marginBottom: 5 }}>
                            <Text style={{ color: '#0084FF', fontWeight: 'bold' }}>Send</Text>
                        </View>
                    </Send>
                )}
                renderSystemMessage={props => (
                    <View style={{ alignSelf: 'center', backgroundColor: '#E0E0E0', padding: 5, borderRadius: 10 }}>
                        <Text style={{ color: '#333333' }}>{props.currentMessage.text}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default ChatDetailsScreen;

const styles = StyleSheet.create({});
