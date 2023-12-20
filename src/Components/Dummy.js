import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { AppColor } from '../utils/AppColor'

const Dummy = ({ increaseCount }) => {
    console.log('Dummy')
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, alignItems: 'center', backgroundColor: 'red', margin: 6 }}>
            {/* <Text onPress={() => setCount(count1 + 1)}>plus</Text>
            <Text>{count}</Text>
            <Text onPress={() => setCount(count1 - 1)}>minus</Text> */}
            <Text onPress={increaseCount}>ahsjkdfhskajfjajkdsfajksfjksh</Text>
        </View>
    )
}

export default memo(Dummy)

const styles = StyleSheet.create({})

// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React, { useCallback, useState } from 'react'
// import { AppColor } from '../../utils/AppColor'
// import Dummy from '../../Components/Dummy';
// import { Button } from 'react-native-paper';

// const Sell = () => {
//   // console.log('sell')
//   const [count, setCount] = useState(0);
//   const [count1, setCount1] = useState(0);

//   const increaseCount = useCallback(() => {
//     setCount(prev => prev + 1)
//   }, [])

//   return (
//     <SafeAreaView style={{ flex: 1, margin: 1 }}>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: AppColor.smokeWhite, flex: 1, alignItems: 'center', margin: 6 }}>
//         <Button>plus</Button>
//         <Text>{count}</Text>
//         <Text onPress={() => setCount(count - 1)}>minus</Text>
//       </View>
//       <Dummy increaseCount={increaseCount} />
//     </SafeAreaView>
//   )
// }

// export default Sell

// const styles = StyleSheet.create({})