import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header/Header';
import { AppColor } from '../../utils/AppColor';
import { height, width } from '../../utils/Dimensions/Dimension';
import Icon from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { customStyles } from '../../utils/Styles';
import { Button, TextInput, Snackbar } from 'react-native-paper'; // Add Snackbar import
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserAction, UpdateUserAction } from '../../Redux/Action/GetUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ImagePicked, setImagePicked] = useState('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false); // State for Snackbar visibility

    const userRes = useSelector((state) => state.GetUserReducer.USERDETAILS);
    const updateRes = useSelector((state) => state.GetUserReducer.UPDATEUSER);
    console.log("🚀 ~ file: EditProfile.js:24 ~ EditProfile ~ updateRes:", updateRes)

    useEffect(() => {
        fetchUserDetails()
    }, [])

    useEffect(() => {
        if (userRes) {
            setName(userRes.name || '');
            setEmail(userRes.email || '');
            setMobileNumber(userRes.phoneNumber || '');
        }
    }, [userRes]);

    useEffect(() => {
        if (updateRes.message === "User Update" && updateRes.updateUser) {
            setIsSnackbarVisible(true);
            setTimeout(() => {
                navigation.goBack();
                dispatch({ type: 'UpdateUser', payload: "" });
            }, 1000);
        }
    }, [updateRes]);

    const fetchUserDetails = async () => {
        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token);
        dispatch(GetUserAction(parseToken))
    }

    const imagePickerFnc = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImagePicked(image.path);
        });
    }

    const updateProfile = async () => {
        const token = await AsyncStorage.getItem('Token');
        const parseToken = JSON.parse(token);
        let params = {
            name: name,
            email: email,
            phone: mobileNumber
        }
        dispatch(UpdateUserAction(params, parseToken))
        setProfileUpdated(true);
    };

    const onDismissSnackbar = () => {
        setIsSnackbarVisible(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.firstContainer}>
                    <View style={styles.profileView}>
                        <ImageBackground
                            resizeMode="cover"
                            source={{
                                uri: ImagePicked,
                            }}
                            style={styles.profileImage}
                        >
                        </ImageBackground>
                        <TouchableOpacity onPress={imagePickerFnc} style={styles.cameraView}>
                            <Icon name="camera" size={height / 40} color={AppColor.black} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.secondContainer}>
                    <TextInput
                        style={styles.input}
                        label="Name"
                        mode='outlined'
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Name"
                    />

                    <TextInput
                        style={styles.input}
                        label="Email"
                        mode='outlined'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                    />

                    <TextInput
                        style={[styles.input, { backgroundColor: AppColor.smokeWhite }]}
                        label="Mobile Number"
                        mode='outlined'
                        textColor={AppColor.blueViolet}
                        value={`${mobileNumber}`}
                        editable={false}
                        placeholder="Mobile Number"
                    />
                    <Button
                        mode="contained"
                        onPress={updateProfile}
                        disabled={profileUpdated}
                        style={styles.button}
                    >
                        Update Profile
                    </Button>
                </View>
                <Snackbar
                    visible={isSnackbarVisible}
                    onDismiss={onDismissSnackbar}
                    duration={Snackbar.DURATION_SHORT}
                    style={{ backgroundColor: AppColor.blueViolet }}
                >
                    Profile updated successfully!
                </Snackbar>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.blueViolet,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    },
    firstContainer: {
        flex: 0.22,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 5,
    },
    secondContainer: {
        flex: 1,
        // backgroundColor: 'blue',
        // justifyContent: 'center',
        width: width - 30,
        alignSelf: 'center',
        gap: 10

    },
    profileView: {
        borderRadius: (width * 0.3) / 2,
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: (width * 0.3) / 2
    },
    cameraView: {
        width: width * 0.07,
        height: width * 0.07,
        borderRadius: (width * 0.07) / 2,
        backgroundColor: AppColor.smokeWhite,
        position: 'absolute',
        bottom: 20,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        // height: 40,
        // borderColor: 'gray',
        // borderWidth: 1,
        // margin: 10,
        // paddingLeft: 10,
        // borderRadius: 5,
        backgroundColor: 'white',
        color: AppColor.grey
    },
    button: {
        marginTop: 20,
        backgroundColor: AppColor.blueViolet,
    },

});
