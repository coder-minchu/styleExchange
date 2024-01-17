import * as React from 'react';
import App from './App';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useNavigation } from '@react-navigation/native';

const Setup = () => {

    const navigation = useNavigation();

    const handleDynamicLink = link => {
        console.log("🚀 ~ handleDynamicLink ~ link:", link)
        let productId = link.url.split('=').pop()
        // Handle dynamic link inside your own application
        if (link.url === `https://styleexchange.page.link/ProductDetails?productId=${productId}`) {
            navigation.navigate('ProductDetails', { product_id: productId })
            // Alert.alert('Product Details')
        }
    };

    useEffect(() => {
        console.log("🚀 ~ handleDynamicLink ~ link:")
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                let productId = link.url.split('=').pop()
                if (link.url === `https://styleexchange.page.link/ProductDetails?productId=${productId}`) {
                    navigation.navigate('ProductDetails', { product_id: productId })
                }
            });
    }, []);

    return <App />;
};

export default Setup;