import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CategoryType, ProductType } from '@/types/type'
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import ProductList from '@/components/ProductList'
import Categories from '@/components/Categories'
import FlashSale from '@/components/FlashSale'


type Props = {}

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    getProducts();
    getCategories();
    getSaleProduct();
  },[])
  const getProducts = async() => {
    const URL = `http://192.168.119.229:8000/products`
    const response = await axios.get(URL);
    setProducts(response.data);
    setIsLoading(false)
    
  }
  const getCategories = async() => {
    const URL = `http://192.168.119.229:8000/categories`
    const response = await axios.get(URL);
    console.log( response.data)
    setCategories(response.data);
    setIsLoading(false)
    
  }
  const getSaleProduct = async() => {
    const URL = `http://192.168.119.229:8000/saleProducts`
    const response = await axios.get(URL);
    setSaleProducts(response.data);
    setIsLoading(false)
    
  }

  if(isLoading){
    return(
      <View>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }
  return (
    <>
    <Stack.Screen options={{
      headerShown:true,
      header: () => <Header/>,
    }}
    />
    <ScrollView>
    <Categories categories={categories}/>
    <FlashSale products={saleProducts}/>
    <View style={{marginBottom:10, marginHorizontal:20}}>
      <Image source={require('@/assets/images/sale-banner.jpg')}
      style={{width:"100%",height:150, borderRadius:15}}
      />
    </View>
      <ProductList products={products} flatlist={false}/>
    </ScrollView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
 
})