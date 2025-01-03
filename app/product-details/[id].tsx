import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
type Props = {

}
const ProductDetails = (props: Props) => {
        const {id} = useLocalSearchParams();
  return (
    <View>
      <Text>product details - {id}</Text>
    </View>
  )
}

export default ProductDetails;


const styles = StyleSheet.create({})