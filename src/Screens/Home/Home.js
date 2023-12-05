import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DrawerNavigator from '../../Drawer/DrawerNavigator'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DrawerNavigator />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'

  }
})