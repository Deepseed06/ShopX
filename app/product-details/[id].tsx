import { ScrollView, StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { ProductType } from '@/types/type'
import ImageSlider from '@/components/ImageSlider'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import {useHeaderHeight} from '@react-navigation/elements' 
import Animated, { FadeInDown, SlideInDown } from 'react-native-reanimated'
type Props = {

}
const ProductDetails = (props: Props) => {
    const {id, productType} = useLocalSearchParams();
    const [products, setProducts] = useState<ProductType>()
    const [toggleHeart, setToggleHeart] = useState(false)
    useEffect(() => {
        getProductDetails();
    },[])
    const getProductDetails = async() =>{
    const URL = productType ==='sale' ? 
    `http://192.168.119.229:8000/saleProducts/${id}`:
    `http://192.168.119.229:8000/products/${id}`
    const response = await axios.get(URL);
    setProducts(response.data);
    }

    const headreHeight = useHeaderHeight();

  return (
<>
    <Stack.Screen options={{title:"Product Details", 
    headerTransparent:true, 
    headerLeft:() => 
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={24} color={Colors.black} />
        </TouchableOpacity>,
    headerRight: () =>   <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name='cart-outline' size={24} color={Colors.black} />
    </TouchableOpacity>
    }} />
    <ScrollView style={{marginTop:headreHeight, marginBottom:90}} >
    {products && (
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <ImageSlider imageList={products.images}/>
        </Animated.View>
        )}
    {products && (
        <View style={styles.container}>
            <Animated.View 
            entering={FadeInDown.delay(500).duration(500)}
            style={styles.ratingWrapper}>
                <View>
                    <Ionicons name='star' size={20} color={"#D4AF37"}/>
                    <Text style={styles.rating}>4.7<Text>(123)</Text></Text>
                </View>
                    {
                    toggleHeart ? 
               ( <TouchableOpacity onPress={() => {
                setToggleHeart(!toggleHeart)
               }}>
                    <Ionicons name='heart' size={20} color={"red"}/>
                </TouchableOpacity>):
                (<TouchableOpacity onPress={() => {
                    setToggleHeart(!toggleHeart)
                }}>
                        <Ionicons name='heart-outline' size={20} color={Colors.black}/>
                </TouchableOpacity>)
                    }
                    
            </Animated.View>
            <Animated.Text 
            entering={FadeInDown.delay(700).duration(500)} 
            style={styles.title}>{products.title}</Animated.Text>
            <Animated.View entering={FadeInDown.delay(900).duration(500)} style={styles.priceWrapper}>
                <Text style={styles.price}>${products.price}</Text>
                <View style={styles.priceDiscount}>
                    <Text style={styles.priceDiscountTxt}>6% Off</Text>
                </View>
                    <Text style={styles.oldPrice}>${products.price + 2}</Text>
            </Animated.View>
            <Animated.Text entering={FadeInDown.delay(1100).duration(500)} style={styles.description}>{products.description}</Animated.Text>
            <Animated.View entering={FadeInDown.delay(1300).duration(500)} style={styles.productVariationWrapper}>
                <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Color</Text>
                    <View style={styles.productVariationValueWrapper}>
                        <View style={{borderColor:Colors.primary , borderRadius:100, borderWidth:1, padding:2}}>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#D4AF37'}]}/>
                        </View>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#333'}]}/>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#8bc34a'}]}/>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#2196f3'}]}/>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#f44336'}]}/>
                        <View style={[styles.productVariationColorValue, {backgroundColor:'#9c27b0'}]}/>
                    </View>
                </View>
                <View style={styles.productVariationType}>
                    <Text style={styles.productVariationTitle}>Size</Text>
                    <View style={styles.productVariationValueWrapper}>
                        <View style={[styles.productVariationSizeValue,{borderColor:Colors.primary} ]}>
                             <Text style={[styles.productVariationSizeValueText, {color:Colors.primary, fontWeight:'bold'}]}>S</Text>
                        </View>
                        <View style={styles.productVariationSizeValue}>
                             <Text style={styles.productVariationSizeValueText}>M</Text>
                        </View>
                        <View style={styles.productVariationSizeValue}>
                             <Text style={styles.productVariationSizeValueText}>L</Text>
                        </View>
                        <View style={styles.productVariationSizeValue}>
                             <Text style={styles.productVariationSizeValueText}>XL</Text>
                        </View>
                    </View>
                </View>

            </Animated.View>
        </View>
        )}

    </ScrollView>
    <Animated.View entering={SlideInDown.delay(500).duration(500)} style={styles.buttonWrapper}>
        <TouchableOpacity style={[
            styles.button,
            {
                backgroundColor:Colors.white,
                borderColor:Colors.primary,
                borderWidth:1
            }
        ]}>
            <Ionicons name='cart-outline' size={20} color={Colors.primary}/>
            <Text style={[styles.buttonText,{color:Colors.primary}]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
    </Animated.View>
    </>
  )
}

export default ProductDetails;


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    ratingWrapper:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:5
    },
    rating:{
        marginLeft:5,
        fontSize:14,
        fontWeight:'400',
        color:Colors.gray
    },
    title:{
        fontSize:20,
        fontWeight:'400',
        color:Colors.black,
        letterSpacing:0.6,
        lineHeight:32
    },
    priceWrapper:{
        flexDirection:'row',
        alignItems:"center",
        marginTop:10,
        gap:5,
    },
    price:{
        fontSize:18,
        fontWeight:"600",
        color:Colors.black
    },
    priceDiscount:{
        backgroundColor:Colors.extraLightGray,
        padding:5,
        borderRadius:5
    },
    priceDiscountTxt:{
        fontSize:14,
        fontWeight:"400",
        color: Colors.primary
    },
    oldPrice:{
        fontSize:14,
        fontWeight:"400",
        textDecorationLine:"line-through",
        color: Colors.gray
    },
    description:{
        marginTop:20,
        fontSize:14,
        fontWeight:"400",
        color: Colors.black,
        letterSpacing:0.6,
        lineHeight:24,
    },
    productVariationWrapper:{
        flexDirection: 'row',
        marginTop:20,
        flexWrap:'wrap',
    },
    productVariationType:{
        width:'50%',
        gap:5,
        marginBottom:10
    },
    productVariationTitle:{
        fontSize:16,
        fontWeight:'500',
        color:Colors.black
    },
    productVariationValueWrapper:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        flexWrap:'wrap'
    },
    productVariationColorValue:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:Colors.extraLightGray
    },
    productVariationSizeValue:{
        width:50,
        height:30,
        borderRadius:5,
        backgroundColor:Colors.extraLightGray,
        justifyContent:'center',
        alignItems:"center",
        borderWidth:1
    },
    productVariationSizeValueText:{
        fontSize:12,
        fontWeight:'500',
        color:Colors.black
    },
    buttonWrapper:{
        position:"absolute",
        height:90,
        padding:20,
        bottom:0,
        width:'100%',
        backgroundColor:Colors.white,
        flexDirection:'row',
        gap:5
    },
    button:{
        flex:1,
        flexDirection:'row',
        backgroundColor:Colors.primary,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        gap:5,
        elevation:5,
        shadowColor:Colors.black,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.64
    },
    buttonText:{
        fontSize:16,
        fontWeight:'500',
        color:Colors.white
    }
})