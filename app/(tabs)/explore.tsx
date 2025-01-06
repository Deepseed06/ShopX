import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryType } from '@/types/type'
import axios from 'axios'
import { Stack } from 'expo-router'
import {useHeaderHeight} from '@react-navigation/elements'
import { Colors } from '@/constants/Colors'
import Animated, { FadeInDown } from 'react-native-reanimated'

type Props = {}
const ExploreScreen = (props: Props) => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const headreHeight = useHeaderHeight()
  useEffect(() => {
    getCategories()
  },[])
  const getCategories = async() => {
    const URL = `http://192.168.119.229:8000/categories`
    const response = await axios.get(URL);
    console.log( response.data)
    setCategories(response.data);
    
  }
  return (
    <>
    <Stack.Screen options={{headerShown:true,
      headerTransparent:true
      
    }}/>
    <View style={[styles.container, {marginTop:headreHeight}]}>
      <FlatList 
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <Animated.View 
        entering={FadeInDown.delay(300 + index *100).duration(500)}
        style={styles.itemWrapper}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Image source={{uri: item.image}} style={{width:100, height:100, borderRadius:10}}/>
        </Animated.View>
      )}
      
      />
    </View>
      </>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
  },
  itemWrapper:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    backgroundColor: Colors.extraLightGray,
    padding:10,
    borderRadius:10,
    marginBottom:20
  },
  itemTitle:{
    fontSize:16,
    fontWeight:"500",
    color:Colors.black
  }
})