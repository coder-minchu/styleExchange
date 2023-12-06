import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

const DrawerContent = ({ ...props }) => {
    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} />
            <DrawerItem
                label="Help"
                onPress={() => Linking.openURL('https://mywebsite.com/help')}
            /> */}
        </DrawerContentScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({})