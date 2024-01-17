import io from 'socket.io-client';
import { BASE_URL } from './BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_URL = BASE_URL

class WSService {

    initializeSocket = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const parseToken = JSON.parse(token);
            console.log("🚀 ~ WSService ~ initializeSocket= ~ token:", token)
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                extraHeaders: {
                    authorization: parseToken
                },
                auth: {
                    token: parseToken
                }
            })
            console.log("initializing socket", this.socket)

            this.socket.on('connect', (data) => {
                console.log("=== socket connected ====")
            })

            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ====")
            })

            this.socket.on('error', (data) => {
                console.log("socekt error", data)
            })

            // this.socket.on("chat_from_server", (data) => {
            //     console.log("data", data)
            // })

        } catch (error) {
            console.log("scoket is not inialized", error)
        }
    }

    emit(event, data = {}, message = "") {
        this.socket.emit(event, data, message);
        // console.log("first", data)
        // console.log("socket", this.socket)

    }

    on(event, cb) {
        this.socket?.on(event, cb)
    }

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }

}

const socketServcies = new WSService()

export default socketServcies