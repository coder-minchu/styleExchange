// import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';
// import {LoginAction} from '../../Redux/Action/LoginAction';
// import {height} from '../../utils/Dimensions/Dimension';
// import TextinputWithLabel from '../../Components/Sell/Login/TextinputWithLabel';
// import Loginbutton from '../../Components/Sell/Login/Loginbutton';
// import {LogoutAction} from '../../Redux/Action/LogoutAction';
// import {useNavigation} from '@react-navigation/native';

// const Login = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loginAPiCall = () => {
//     let params = {
//       email: 'yashrai1207@gmail.com',
//       password: 'yashrai1207@gmail.com',
//     };
//     dispatch(LoginAction(params));
//     navigation.navigate('Categories');
//   };

//   const logoutAPiCall = () => {
//     let params = {
//       email: 'yashrai1207@gmail.com',
//       password: 'yashrai1207@gmail.com',
//     };
//     dispatch(LogoutAction(params));
//   };
//   return (
//     <View style={styles.loginContainer}>
//       <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold'}}>
//         Log in
//       </Text>
//       <View style={{marginTop: 20, gap: 10}}>
//         <TextinputWithLabel
//           label="Enter Your Email"
//           // value={email}
//           // onChangeText={text => setEmail(text)}
//         />
//         <TextinputWithLabel
//           label="Enter Your Password"
//           // value={password}
//           // onChangeText={text => setPassword(text)}
//         />
//         <Loginbutton onPress={() => loginAPiCall()} name="Login" />
//         <Loginbutton onPress={() => logoutAPiCall()} name="Logout" />
//       </View>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   loginContainer: {
//     padding: 20,
//     height: height / 1,
//     // justifyContent: 'center',
//     gap: 10,
//     marginTop: 100,
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     // padding: 10,
//   },
// });
